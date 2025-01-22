import React from 'react';
import { PreviewProps } from 'sanity';
import { Box } from '@sanity/ui';
import getYouTubeID from 'get-youtube-id';

import { createPreview } from '@/schemas/preview/preview';

export interface VideoPreviewProps extends PreviewProps {
  url?: string;
}

export const VideoPreview = createPreview(
  ({ renderError }) =>
    ({ url }: VideoPreviewProps) => {
      if (!url) return renderError('Missing URL');

      const id = getYouTubeID(url);

      if (!id) return renderError('Invalid URL');

      return (
        <Box padding={2}>
          <div style={{ maxWidth: 150 }}>
            <div
              style={{
                backgroundColor: 'black',
                position: 'relative',
                paddingTop: `${(9 / 16) * 100}%`,
              }}
            >
              <img
                alt='Video Thumbnail'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  objectFit: 'cover',
                }}
                src={`https://img.youtube.com/vi/${id}/0.jpg`}
              />
              {/* <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            title='YouTube Preview'
            src={embedUrl}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          /> */}
              <div style={{ position: 'absolute', inset: 0 }}></div>
            </div>
          </div>
        </Box>
      );
    }
);
