import { StyleSheet, Platform } from "react-native";

const theme = {
  color: "#000000",
  fontFamily: "Metro"
};

export default StyleSheet.create({
  body: {},

  heading1: {
    color: theme.color,
    flexDirection: 'row',
    fontFamily: theme.fontFamily,
    fontSize: 38,
    marginTop: 32,
    marginBottom: 16
  },
  heading2: {
    color: theme.color,
    flexDirection: 'row',
    fontFamily: theme.fontFamily,
    fontSize: 28,
    marginTop: 32,
    marginBottom: 16
  },
  heading3: {
    color: theme.color,
    flexDirection: 'row',
    fontFamily: theme.fontFamily,
    fontSize: 22,
    marginTop: 32,
    marginBottom: 16
  },
  heading4: {
    color: theme.color,
    flexDirection: 'row',
    fontFamily: theme.fontFamily,
    fontSize: 18,
    marginTop: 32,
    marginBottom: 16
  },
  heading5: {
    color: theme.color,
    flexDirection: 'row',
    fontFamily: theme.fontFamily,
    fontSize: 16,
    marginTop: 32,
    marginBottom: 16
  },
  heading6: {
    color: theme.color,
    flexDirection: 'row',
    fontFamily: theme.fontFamily,
    fontSize: 14,
    marginTop: 32,
    marginBottom: 16
  },

  hr: {
    backgroundColor: theme.color,
    height: 1,
  },

  strong: {
    color: theme.color,
    fontFamily: 'Metro-Bold',
    fontWeight: 'bold',
  },
  em: {
    color: theme.color,
    fontFamily: theme.fontFamily,
    fontStyle: 'italic',
  },
  s: {
    color: theme.color,
    fontFamily: theme.fontFamily,
    textDecorationLine: 'line-through',
  },

  blockquote: {
    color: theme.color,
    backgroundColor: '#202029',
    borderColor: '#FE8605',
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5,
  },

  bullet_list: {
    color: theme.color,
    fontFamily: theme.fontFamily,
    fontSize: 18
  },
  ordered_list: {
    color: theme.color,
  },
  list_item: {
    color: theme.color,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  bullet_list_icon: {
    color: theme.color,
    marginLeft: 10,
    marginRight: 10,
  },

  bullet_list_content: {
    flex: 1,
    color: theme.color,
  },

  ordered_list_icon: {
    color: theme.color,
    marginLeft: 10,
    marginRight: 10,
  },

  ordered_list_content: {
    flex: 1,
    color: theme.color,
  },

  code_inline: {
    color: theme.color,
    fontSize: 16,
    fontWeight: 400,
    ...Platform.select({
      ['web']: {
        fontFamily: 'monospace',
      },
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  code_block: {
    color: '#FE8605',
    borderWidth: 2,
    borderColor: '#FE8605',
    backgroundColor: '#202029',
    borderRadius: 4,
    padding: 12,
    margin: 12,
    ...Platform.select({
      ['web']: {
        fontFamily: 'monospace',
      },
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  fence: {
    color: '#FE8605',
    borderWidth: 2,
    borderColor: '#FE8605',
    backgroundColor: '#202029',
    borderRadius: 4,
    padding: 12,
    margin: 12,
    ...Platform.select({
      ['web']: {
        fontFamily: 'monospace',
      },
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },

  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
  },

  link: {
    color: '#3D3D9D',
    fontSize: 16,
    fontFamily: theme.fontFamily,
    fontWeight: 400,
    textDecorationLine: 'underline',
  },
  blocklink: {
    flex: 1,
    color: '#3D3D9D',
    fontSize: 16,
    fontFamily: theme.fontFamily,
    fontWeight: 400,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },

  image: {
    flex: 1,
  },

  text: {
    color: theme.color,
    fontSize: 16,
    fontFamily: theme.fontFamily,
    fontWeight: 400
  },
  textgroup: {
    color: theme.color,
    fontSize: 16,
    fontFamily: theme.fontFamily,
    fontWeight: 400
  },
  paragraph: {
    color: theme.color,
    fontSize: 16,
    fontFamily: theme.fontFamily,
    fontWeight: 400,
    padding: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  hardbreak: {
    width: '100%',
    height: 1,
  },
  softbreak: {},

  pre: {},
  inline: {},
  span: {},
});
