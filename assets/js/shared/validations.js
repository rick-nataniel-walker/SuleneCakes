// Javascript RegExp Reference
//  /abc/	A sequence of characters
//  /[abc]/	Any character from a set of characters
//  /[^abc]/	Any character not in a set of characters
//  /[0-9]/	Any character in a range of characters
//  /x+/	One or more occurrences of the pattern x
//  /x+?/	One or more occurrences, nongreedy
//  /x*/	Zero or more occurrences
//  /x?/	Zero or one occurrence
//  /x{2,4}/	Two to four occurrences
//  /(abc)/	A group
//  /a|b|c/	Any one of several patterns
//  /\d/	Any digit character
// /\w/	An alphanumeric character (“word character”)
//  /\s/	Any whitespace character
//  /./	Any character except newlines
//  /\b/	A word boundary
//  /^/	Start of input
//  /$/	End of input
var notyf = new Notyf({
  duration:5000,
  position:{x:'right',y:'top'},
  dismissible:true,
  className:'toast'
});

function validateNumbers(text) {
  let reg = new RegExp("^[0-9]+$");
  return reg.test(text);
}

function notNullable(text){
  if(text=="") return false;
  return true;
}

function validateDecimals(text) {
  //"[1-9]*\.[0-9]"
  let reg = new RegExp("^[1-9]+\.[0-9]+$");
  return text.match(reg);
}

function validateNationalID(text) {
  let reg = new RegExp("^[0-9]{12}[A-Z]$");
  return reg.test(text);
}



function validateNUIT(text) {
  let reg = new RegExp("^[0-9]{9}$");
  return reg.test(text);
}

function makeNationalPhoneNumbers(text) {

  let reg = new RegExp("^8[2-7][0-9]{7}$");
  validateNumbers(text);
  return text.match(reg);
}
function makeMpesaNumbers(text) {

  let reg = new RegExp("^8[4-5][0-9]{7}$");
  validateNumbers(text);
  return text.match(reg);
}

function validateEmail(text) {
  let reg = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
  return reg.test(text);
}


function validationAction(component,callback) {
      let result = callback(component.value);
      if(!result){
        component.style="border-color:red";
        notyf.error(`formato de ${component.name.replaceAll('_',' d ').replaceAll('-',' d ')} inválido`);
        return false;
      }

      else component.style="border-color:inherit";
      return true;
}

canUploadFile = (fileInput,size) => {
      // Check if any file is selected.
      if (fileInput.files.length > 0) {
          for (const i = 0; i <= fileInput.files.length - 1; i++) {

              const fsize = fileInput.files.item(i).size;
              const file = Math.round((fsize / 1024));
              // The size of the file.
              if (file > size) {
                notyf.error(`O tamanho do ficheiro não pode ser superior que 2MB`);
                return false;
              }else return true;

          }
      }
  }

function submitForm(e, form) {
  e.preventDefault();
  performSubmition(form);
}

function performSubmition(form) {
  formsNode = form.elements;
  for(let i = 0; i < formsNode.length; i++){
    if(formsNode[i].style.borderColor == "red")  return false;
  }
  form.submit();
  return true;
}
