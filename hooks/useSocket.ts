import { useCallback, useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

function useWebSocket<T>({
  url,
  onMessage,
  onError,
}: {
  url: string;
  onMessage?: (data: T) => void;
  onError?: (err: Error) => void;
}) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const [socket, setSource] = useState<Socket | null>(null);

  useEffect(
    () => {
      const socket = io({ path: '/api/ws/connect' });

      socket.on('connect', () => {
        setOpen(true);
        setSource(socket);

        if (onMessage) {
          socket.on('message', (message: T) => {
            onMessage(message);
          });
        }

        if (onError) {
          socket.on('error', (source: WebSocket, ev: Event) => {
            onError(new Error('socket error'));
          });
        }
      });

      console.log(socket);

      return () => {
        socket?.disconnect();
        setOpen(false);
        setSource(null);
      };
    },
    [
      // url, onMessage, onError
    ],
  );

  const send = useCallback((msg: any) => socket?.send(msg), [socket]);

  const close = useCallback(() => {
    if (socket?.disconnect) {
      socket.disconnect();
      setOpen(false);
      setSource(null);
    }
  }, [socket]);

  return { isOpen, send, close };
}

export default useWebSocket;
