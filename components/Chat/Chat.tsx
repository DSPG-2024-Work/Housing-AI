'use client'

import { useState, useCallback, useEffect, useRef, useReducer, useContext, forwardRef, useImperativeHandle } from 'react';
import { Flex, Heading, IconButton, ScrollArea, Tooltip } from '@radix-ui/themes';
import ContentEditable from 'react-contenteditable';
import toast from 'react-hot-toast';
import { AiOutlineClear, AiOutlineLoading3Quarters, AiOutlineUnorderedList } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import ChatContext from './chatContext';
import type { Chat, ChatMessage } from './interface';
import Message from './Message';
import { useTheme } from '../Themes';
import './index.scss';

const HTML_REGULAR = /<(?!img|table|\/table|thead|\/thead|tbody|\/tbody|tr|\/tr|td|\/td|th|\/th|br|\/br).*?>/gi;

export interface ChatProps { }

export interface ChatGPInstance {
  setConversation: (messages: ChatMessage[]) => void;
  getConversation: () => ChatMessage[];
  focus: () => void;
}

const postChatOrQuestion = async (chat: Chat, messages: any[], input: string) => {
  var url = '/chat';
  const proxy_url = window.location.href;
  if (proxy_url) {
    url = proxy_url.replace('3000', '5000');
  }

  const data = {
    prompt: chat?.persona?.prompt,
    messages: [...messages!],
    input,
  };

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'text/event-stream',
    },
    body: JSON.stringify(data),
  });
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};


const Chat = (props: ChatProps, ref: any) => {
  const { debug, currentChatRef, saveMessages, onToggleSidebar } = useContext(ChatContext);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const conversation = useRef<ChatMessage[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);// State for lightbox
  const [lightBoxURL, setIsLightBoxURL] = useState(""); 

  const conversationRef = useRef<ChatMessage[]>();

  const [message, setMessage] = useState('');

  const [currentMessage, setCurrentMessage] = useState<string>('');

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLElement>(null);

  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  const handleAgentResponse = useCallback((response: ChatMessage) => {
    conversation.current = [...conversation.current, response];

    // Check if the response includes a source link
    if (response.sourceLink) {
      const sourceLinkContent = `Source: <a href="${response.sourceLink}" target="_blank">${response.sourceLink}</a>`;
      conversation.current.push({ content: sourceLinkContent, role: 'assistant' });
    }

    forceUpdate();
  }, []);

  const fetchSuggestions = useCallback(async (input: string) => {
    const mockSuggestions = ['Iowa State University Extensions and Outreach - CED :Can you Generate a map', 'Iowa State University Extensions and Outreach - CED :What is RHRA program?', 'Iowa State University Extensions and Outreach - CED :Provide some source', 'Hello', 'To make only the text on your screen larger, adjust the slider next to Text size.', 'To make only the text on your screen larger, adjust the slider next to Text size. To make everything larger, including images and apps, select Display, and then choose an option from the drop-down menu next to Scale.'];
    const filteredSuggestions = mockSuggestions.filter((s) => s.toLowerCase().includes(input.toLowerCase()));
    // setSuggestions(filteredSuggestions);
    // setShowSuggestions(filteredSuggestions.length > 0);
  }, []);


    const sendMessage = useCallback(
    async (e: any) => {
      if (!isLoading) {
        e.preventDefault()
        const input = textAreaRef.current?.innerHTML?.replace(HTML_REGULAR, '') || ''

        if (input.length < 1) {
          toast.error('Please type a message to continue.')
          return
        }

        const message = [...conversation.current]
        conversation.current = [...conversation.current, { content: input, role: 'user' }]
        setMessage('')
        setIsLoading(true)
        try {
          const response = await postChatOrQuestion(currentChatRef?.current!, message, input)

          if (response.ok) {
            const data = response.body

            if (!data) {
              throw new Error('No data')
            }

            const reader = data.getReader()
            const decoder = new TextDecoder('utf-8')
            let done = false
            let resultContent = ''
            let sourceLink = ''
            while (!done) {
              try {
                const { value, done: readerDone } = await reader.read()
                const char = decoder.decode(value)
                if (char) {
                  setCurrentMessage((state) => {
                    if (debug) {
                      console.log({ char })
                    }
                    
                    let parts = char.split('||links ');
                    if (parts.length > 1) {
                      
                      resultContent += parts[0] + "\n";
                      try {
                        const links:string = parts[1].replaceAll("'", '"');
                        const linksJSON:any = JSON.parse(links)
                        if('map_link' in linksJSON) { 
                          resultContent += `<div class="iframe-container"><iframe src="${linksJSON['map_link']}" frameborder="0"></iframe>`;
                          resultContent += `<button id="expand-map" class="expand-button">Expand</button></div>`;
                        } else if (('sattelite_image' in linksJSON)) {
                          resultContent += ` <div style="display: flex; justify-content: space-between;">
                                                <div style="text-align: center; max-width: 48%;">
                                                    <img id="expand-map" src="${linksJSON['sattelite_image']}?${Date.now()}" alt="Sattelite image" style="width: 100%; height: auto;">
                                                    <div style="margin-top: 8px; font-size: 14px; color: #555;">Sattelite image</div>
                                                </div>
                                                <div style="text-align: center; max-width: 48%;">
                                                    <img id="expand-map" src="${linksJSON['sattelite_image_with_mask']}?${Date.now()}" alt="Sattelite image with mask" style="width: 100%; height: auto;">
                                                    <div style="margin-top: 8px; font-size: 14px; color: #555;">Sattelite image with housing mask</div>
                                                </div>
                                            </div>`
                        } 
                        if ('src' in linksJSON) {
                          sourceLink = linksJSON['src']
                        }
                      } catch (error) {
                        // silent exit, don't show the map
                        console.log(error)
                      }
                    } else {
                      resultContent = state + char;
                    }
                    return resultContent;
                  })
                }
                done = readerDone
              } catch {
                done = true
              }
            }
            // The delay of timeout can not be 0 as it will cause the message to not be rendered in racing condition
            
            setTimeout(() => {
              if (debug) {
                console.log({ resultContent })
              }
              conversation.current = [
                ...conversation.current,
                { content: resultContent, role: 'assistant', sourceLink }
              ]

              setCurrentMessage('')
            }, 1)
          } else {
            const result = await response.json()
            if (response.status === 401) {
              conversation.current.pop()
              location.href =
                result.redirect +
                `?callbackUrl=${encodeURIComponent(location.pathname + location.search)}`
            } else {
              toast.error(result.error)
            }
          }

          setIsLoading(false)
        } catch (error: any) {
          console.error(error)
          toast.error(error.message)
          setIsLoading(false)
        }
      }
    },
    [currentChatRef, debug, isLoading]
  )

  const handleKeypress = useCallback(
    (e: any) => {
      if (e.keyCode == 13 && !e.shiftKey) {
        sendMessage(e);
        e.preventDefault();
      }
    },
    [sendMessage]
  );

  const clearMessages = () => {
    conversation.current = [];
    forceUpdate?.();
    setMessage('');
    setCurrentMessage('');
    setIsLoading(false);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '50px';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 2}px`;
    }
  }, [message, textAreaRef]);

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation, currentMessage]);

  useEffect(() => {
    conversationRef.current = conversation.current;
    if (currentChatRef?.current?.id) {
      saveMessages?.(conversation.current);
    }
  }, [currentChatRef, conversation.current, saveMessages]);

  useEffect(() => {
    if (!isLoading) {
      textAreaRef.current?.focus();
    }
  }, [isLoading]);

  useImperativeHandle(ref, () => {
    return {
      setConversation(messages: ChatMessage[]) {
        conversation.current = messages;
        forceUpdate?.();
      },
      getConversation() {
        return conversationRef.current;
      },
      focus: () => {
        textAreaRef.current?.focus();
      },
    };
  });

  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  useEffect(() => {
    const handleExpandButtonClick = () => {
      setIsLightboxOpen(true);
    };
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target && target.id === 'expand-map') {
        handleExpandButtonClick();
        let mapUrl:any = ""
        if(target instanceof HTMLImageElement) {
          mapUrl = target.src
        } else {
          if(target?.previousElementSibling) {
            mapUrl = target.previousElementSibling?.getAttribute('src');
          }
        }
        // WARNING : iframe is previous to the expand button in layout
        setIsLightBoxURL(mapUrl)
      }
    });

    return () => {
      document.removeEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target && target.id === 'expand-map') {
          handleExpandButtonClick();
        }
      });
    };
  }, []);


  // Lightbox component
  const Lightbox = ({ isOpen, onClose, url }: { isOpen: boolean; onClose: () => void, url:string }) => {
    if (!isOpen) return null;

    return (
      <div className="lightbox">
        <div className="lightbox-content">
          <iframe
            src={url}
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ position: 'relative', zIndex: 9999 }} // Ensure iframe is above other content
          />
          <button className="lightbox-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };


  return (
    <Flex direction="column" height="100%" className="relative" gap="3">
      <Flex
        justify="between"
        align="center"
        py="3"
        px="4"
        style={{ backgroundColor: 'var(--gray-a2)' }}
      >
        <Heading size="4">Iowa State University Extensions and Outreach - CED</Heading>
      </Flex>
      <ScrollArea
        className="flex-1 px-4"
        type="auto"
        scrollbars="vertical"
        style={{ height: '100%' }}
      >
        {conversation.current.map((item, index) => (
          <Message key={index} message={item} onAgentResponse={handleAgentResponse} />
        ))}
        {currentMessage && (
          <Message message={{ content: currentMessage, role: 'assistant' }} onAgentResponse={handleAgentResponse} />
        )}
        <div ref={bottomOfChatRef}></div>
      </ScrollArea>
      <div className="px-4 pb-3">
        <Flex align="end" justify="between" gap="3" className="relative">
          <div className="rt-TextAreaRoot rt-r-size-1 rt-variant-surface flex-1 rounded-3xl chat-textarea" style={{ position: 'relative' }}>
            <ContentEditable
              innerRef={textAreaRef}
              style={{
                minHeight: '24px',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
              className="rt-TextAreaInput text-base"
              html={message}
              disabled={isLoading}
              onChange={(e) => {
                const value = e.target.value.replace(HTML_REGULAR, '');
                setMessage(value);
                if (value) {
                  fetchSuggestions(value);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onKeyDown={(e) => {
                handleKeypress(e);
              }}
              onBlur={() => setShowSuggestions(false)} // Hide suggestions when input loses focus
              onFocus={() => setShowSuggestions(suggestions.length > 0)} // Show suggestions when input gains focus
            />
            <div className="rt-TextAreaChrome"></div>
            {showSuggestions && (
              <div
                className="autocomplete-suggestions"
                style={{ bottom: '60px', left: 0, width: '100%' }} // Adjust bottom and left to position it above the text bar
              >
                {suggestions.map((suggestion, index) => (
                  <div key={index}>
                    <div
                      className="autocomplete-suggestion"
                      onMouseDown={() => {
                        setMessage(suggestion);
                        setSuggestions([]);
                        setShowSuggestions(false);
                      }}
                    >
                      {truncateText(suggestion, 150)}
                    </div>
                    {index < suggestions.length - 1 && <hr className="suggestion-divider" />}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Flex gap="3" className="absolute right-0 pr-4 bottom-2 pt">
            {isLoading && (
              <Flex
                width="6"
                height="6"
                align="center"
                justify="center"
                style={{ color: 'var(--accent-11)' }}
              >
                <AiOutlineLoading3Quarters className="animate-spin size-4" />
              </Flex>
            )}
            <Tooltip content={'Send Message'}>
              <IconButton
                variant="soft"
                disabled={isLoading}
                color="gray"
                size="2"
                className="rounded-xl cursor-pointer"
                onClick={sendMessage}
              >
                <FiSend className="size-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content={'Clear History'}>
              <IconButton
                variant="soft"
                color="gray"
                size="2"
                className="rounded-xl cursor-pointer"
                disabled={isLoading}
                onClick={clearMessages}
              >
                <AiOutlineClear className="size-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content={'Toggle Sidebar'}>
              <IconButton
                variant="soft"
                color="gray"
                size="2"
                className="rounded-xl md:hidden cursor-pointer"
                disabled={isLoading}
                onClick={onToggleSidebar}
              >
                <AiOutlineUnorderedList className="size-4" />
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>
      </div>
      <Lightbox isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} url={lightBoxURL} />
    </Flex>
  );
};

export default forwardRef<ChatGPInstance, ChatProps>(Chat);








