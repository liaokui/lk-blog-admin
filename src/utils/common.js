const StatusList = [
  {
    label: '草稿',
    value: 0,
    showType: 'info'
  },
  {
    label: '完成',
    value: 1,
    showType: 'success'
  }
]
const tinymcePlugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount']
const tinymceToolbar = ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen']
export {
  StatusList,
  tinymcePlugins,
  tinymceToolbar,
}