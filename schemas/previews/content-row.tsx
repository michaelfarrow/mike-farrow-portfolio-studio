import { capitalCase } from 'change-case';
import { isValidElementType } from 'react-is';

import { DocumentIcon } from '@sanity/icons';
import { Badge, Box, Flex } from '@sanity/ui';
import { PreviewProps } from 'sanity';

import {
  IconColumns,
  IconDocumentText,
  IconRows,
} from '@/schemas/common/icons';

import styles from './content-row.module.css';

export interface ContentRowPreviewProps extends PreviewProps {
  span?: number;
  content?: {
    _key: string;
    _type: string;
  }[];
}

export const ContentRowPreview = (props: ContentRowPreviewProps) => {
  const { renderDefault, title, span, content, schemaType } = props;

  const types =
    (schemaType as any)?.fields?.find((field: any) => field.name === 'content')
      ?.type?.of || [];

  const contentTypes = content?.map((item) => {
    const type = types.find((type: any) => type.name === item._type);

    const title =
      type?.title ||
      (type?.name && capitalCase(type?.name)) ||
      (item?._type && capitalCase(item?._type));

    return title;
  });

  const contentTypesStr = contentTypes?.length
    ? contentTypes?.join(', ')
    : 'No content';

  return renderDefault({
    ...{ styles: { media: {} }, icon: span === 1 ? IconColumns : IconRows },
    ...{
      ...props,
      styles: { media: span === 1 ? styles.columns : styles.rows },
      icon: span === 1 ? IconColumns : IconRows,
      title: title || contentTypesStr,
      subtitle: `${content?.length || 0} item${content?.length !== 1 ? 's' : ''}, ${span === 1 ? 'half width' : 'full width'}${title ? ` - ${contentTypesStr}` : ''}`,
      // title:
      //   <Box style={{ display: 'flex', flexWrap: 'wrap', margin: '-0.2em' }}>
      //     <Badge
      //       tone={span === 1 ? 'suggest' : 'positive'}
      //       style={{ margin: '0.2em' }}
      //       key='span'
      //       padding={2}
      //     >
      //       <span style={{ transform: 'scale(0.90)' }}>
      //         {span === 1 ? (
      //           <IconColumns color='inherit !important' />
      //         ) : (
      //           <IconRows color='inherit !important' />
      //         )}
      //       </span>
      //     </Badge>
      //     {content?.map((item) => {
      //       const type = types.find((type: any) => type.name === item._type);

      //       const Icon = type?.icon;
      //       const title =
      //         type?.title ||
      //         (type?.name && capitalCase(type?.name)) ||
      //         (item?._type && capitalCase(item?._type));

      //       return (
      //         <Badge
      //           style={{
      //             margin: '0.2em',
      //           }}
      //           key={item._key}
      //           padding={2}
      //         >
      //           <Flex>
      //             <span style={{ paddingRight: 7, transform: 'scale(0.90)' }}>
      //               {(isValidElementType(Icon) && <Icon />) || <DocumentIcon />}
      //             </span>
      //             {title || 'Unknown'}
      //           </Flex>
      //         </Badge>
      //       );
      //     })}
      //   </Box>
      // ),
    },
  });
};

// (
//   <span className={styles.title}>
//     {content?.map((item) => {
//       const type = types.find((type: any) => type.name === item._type);

//       // const Icon = type?.icon;
//       const title =
//         type?.title ||
//         (type?.name && capitalCase(type?.name)) ||
//         (item?._type && capitalCase(item?._type));

//       return (
//         <span key={item._key} /* className={styles.item} */>
//           {/* <span className={styles.icon}>
//             {(Icon && <Icon />) || <IconDocumentText />}
//           </span> */}
//           {title}
//         </span>
//       );
//     }) || 'No content'}
//   </span>
// )
