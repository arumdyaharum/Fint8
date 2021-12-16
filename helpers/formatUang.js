function formatUang(uang) {
  uang = uang.toString()
  let output = ''
  let counter = 0
  for(let i = uang.length-1; i >= 0; i--) {
    counter++
    if(counter % 3 === 0) {
      output = `.${uang[i]}${output}`;
    } else {
      output = `${uang[i]}${output}`;
    }
  }
  output = 'Rp ' + output + ',00'
  return output;
}

module.exports = formatUang