function revertir(oper, aParam, dParam) {
  // oper == '+
  var letrasHex = '0123456789ABCDEF'
  var result = ''
  for (it = 0; it < 16; it++) {
    var numBase10 = parseInt(aParam.charAt(it), 16)
    var numBase10Mask = parseInt(dParam.charAt(it), 16)
    var resultado;
    if ('+' == oper)
    {
      resultado = numBase10 - numBase10Mask
      if (resultado < 0) resultado = 16 + resultado
    }
    else {
      resultado = numBase10 + numBase10Mask;
    }
    if (resultado <= 9) result = result + resultado.toString()
    else result = result + letrasHex.charAt(resultado % 16).toString()
  }
  return result
}
function arrayerror(n) {
  for (i = 1; i < n; i++) this[i] = 0
  this.length = n
}
var funciona = true
function integer(n) {
  return n % (4294967295 + 1)
}
function shr(a, b) {
  a = integer(a)
  b = integer(b)
  if (a - 2147483648 >= 0) {
    a = a % 2147483648
    a >>= b
    a += 1073741824 >> (b - 1)
  } else
  a >>= b
  return a
}
function shl1(a) {
  a = a % 2147483648
  if (a & 1073741824 == 1073741824)
  {
    a -= 1073741824
    a *= 2
    a += 2147483648
  } else
  a *= 2
  return a
}
function shl(a, b) {
  a = integer(a)
  b = integer(b)
  for (var i = 0; i < b; i++) a = shl1(a)
  return a
}
function and(a, b) {
  a = integer(a)
  b = integer(b)
  var t1 = (a - 2147483648)
  var t2 = (b - 2147483648)
  if (t1 >= 0)
  if (t2 >= 0)
  return ((t1 & t2) + 2147483648)
  else
  return (t1 & b)
  else
  if (t2 >= 0)
  return (a & t2)
  else
  return (a & b)
}
function or(a, b) {
  a = integer(a)
  b = integer(b)
  var t1 = (a - 2147483648)
  var t2 = (b - 2147483648)
  if (t1 >= 0)
  if (t2 >= 0)
  return ((t1 | t2) + 2147483648)
  else
  return ((t1 | b) + 2147483648)
  else
  if (t2 >= 0)
  return ((a | t2) + 2147483648)
  else
  return (a | b)
}
function xor(a, b) {
  a = integer(a)
  b = integer(b)
  var t1 = (a - 2147483648)
  var t2 = (b - 2147483648)
  if (t1 >= 0)
  if (t2 >= 0)
  return (t1 ^ t2)
  else
  return ((t1 ^ b) + 2147483648)
  else
  if (t2 >= 0)
  return ((a ^ t2) + 2147483648)
  else
  return (a ^ b)
}
function not(a) {
  a = integer(a)
  return (4294967295 - a)
}
var state = new Array(4)
var count = new Array(2)
count[0] = 0
count[1] = 0
var buffer = new Array(64)
var transformBuffer = new Array(16)
var digestBits = new Array(16)
var S11 = 7
var S12 = 12
var S13 = 17
var S14 = 22
var S21 = 5
var S22 = 9
var S23 = 14
var S24 = 20
var S31 = 4
var S32 = 11
var S33 = 16
var S34 = 23
var S41 = 6
var S42 = 10
var S43 = 15
var S44 = 21
function F(x, y, z) {
  return or(and(x, y), and(not(x), z))
}
function G(x, y, z) {
  return or(and(x, z), and(y, not(z)))
}
function H(x, y, z) {
  return xor(xor(x, y), z)
}
function I(x, y, z) {
  return xor(y, or(x, not(z)))
}
function rotateLeft(a, n) {
  return or(shl(a, n), (shr(a, (32 - n))))
}
function FF(a, b, c, d, x, s, ac) {
  a = a + F(b, c, d) + x + ac
  a = rotateLeft(a, s)
  a = a + b
  return a
}
function GG(a, b, c, d, x, s, ac) {
  a = a + G(b, c, d) + x + ac
  a = rotateLeft(a, s)
  a = a + b
  return a
}
function HH(a, b, c, d, x, s, ac) {
  a = a + H(b, c, d) + x + ac
  a = rotateLeft(a, s)
  a = a + b
  return a
}
function II(a, b, c, d, x, s, ac) {
  a = a + I(b, c, d) + x + ac
  a = rotateLeft(a, s)
  a = a + b
  return a
}
function transform(buf, offset) {
  var a = 0,
  b = 0,
  c = 0,
  d = 0
  var x = transformBuffer
  a = state[0]
  b = state[1]
  c = state[2]
  d = state[3]
  for (i = 0; i < 16; i++) {
    x[i] = and(buf[i * 4 + offset], 255)
    for (j = 1; j < 4; j++) {
      x[i] += shl(and(buf[i * 4 + j + offset], 255), j * 8)
    }
  }
  a = FF(a, b, c, d, x[0], S11, 3614090360)
  d = FF(d, a, b, c, x[1], S12, 3905402710)
  c = FF(c, d, a, b, x[2], S13, 606105819)
  b = FF(b, c, d, a, x[3], S14, 3250441966)
  a = FF(a, b, c, d, x[4], S11, 4118548399)
  d = FF(d, a, b, c, x[5], S12, 1200080426)
  c = FF(c, d, a, b, x[6], S13, 2821735955)
  b = FF(b, c, d, a, x[7], S14, 4249261313)
  a = FF(a, b, c, d, x[8], S11, 1770035416)
  d = FF(d, a, b, c, x[9], S12, 2336552879)
  c = FF(c, d, a, b, x[10], S13, 4294925233)
  b = FF(b, c, d, a, x[11], S14, 2304563134)
  a = FF(a, b, c, d, x[12], S11, 1804603682)
  d = FF(d, a, b, c, x[13], S12, 4254626195)
  c = FF(c, d, a, b, x[14], S13, 2792965006)
  b = FF(b, c, d, a, x[15], S14, 1236535329)
  a = GG(a, b, c, d, x[1], S21, 4129170786)
  d = GG(d, a, b, c, x[6], S22, 3225465664)
  c = GG(c, d, a, b, x[11], S23, 643717713)
  b = GG(b, c, d, a, x[0], S24, 3921069994)
  a = GG(a, b, c, d, x[5], S21, 3593408605)
  d = GG(d, a, b, c, x[10], S22, 38016083)
  c = GG(c, d, a, b, x[15], S23, 3634488961)
  b = GG(b, c, d, a, x[4], S24, 3889429448)
  a = GG(a, b, c, d, x[9], S21, 568446438)
  d = GG(d, a, b, c, x[14], S22, 3275163606)
  c = GG(c, d, a, b, x[3], S23, 4107603335)
  b = GG(b, c, d, a, x[8], S24, 1163531501)
  a = GG(a, b, c, d, x[13], S21, 2850285829)
  d = GG(d, a, b, c, x[2], S22, 4243563512)
  c = GG(c, d, a, b, x[7], S23, 1735328473)
  b = GG(b, c, d, a, x[12], S24, 2368359562)
  a = HH(a, b, c, d, x[5], S31, 4294588738)
  d = HH(d, a, b, c, x[8], S32, 2272392833)
  c = HH(c, d, a, b, x[11], S33, 1839030562)
  b = HH(b, c, d, a, x[14], S34, 4259657740)
  a = HH(a, b, c, d, x[1], S31, 2763975236)
  d = HH(d, a, b, c, x[4], S32, 1272893353)
  c = HH(c, d, a, b, x[7], S33, 4139469664)
  b = HH(b, c, d, a, x[10], S34, 3200236656)
  a = HH(a, b, c, d, x[13], S31, 681279174)
  d = HH(d, a, b, c, x[0], S32, 3936430074)
  c = HH(c, d, a, b, x[3], S33, 3572445317)
  b = HH(b, c, d, a, x[6], S34, 76029189)
  a = HH(a, b, c, d, x[9], S31, 3654602809)
  d = HH(d, a, b, c, x[12], S32, 3873151461)
  c = HH(c, d, a, b, x[15], S33, 530742520)
  b = HH(b, c, d, a, x[2], S34, 3299628645)
  a = II(a, b, c, d, x[0], S41, 4096336452)
  d = II(d, a, b, c, x[7], S42, 1126891415)
  c = II(c, d, a, b, x[14], S43, 2878612391)
  b = II(b, c, d, a, x[5], S44, 4237533241)
  a = II(a, b, c, d, x[12], S41, 1700485571)
  d = II(d, a, b, c, x[3], S42, 2399980690)
  c = II(c, d, a, b, x[10], S43, 4293915773)
  b = II(b, c, d, a, x[1], S44, 2240044497)
  a = II(a, b, c, d, x[8], S41, 1873313359)
  d = II(d, a, b, c, x[15], S42, 4264355552)
  c = II(c, d, a, b, x[6], S43, 2734768916)
  b = II(b, c, d, a, x[13], S44, 1309151649)
  a = II(a, b, c, d, x[4], S41, 4149444226)
  d = II(d, a, b, c, x[11], S42, 3174756917)
  c = II(c, d, a, b, x[2], S43, 718787259)
  b = II(b, c, d, a, x[9], S44, 3951481745)
  state[0] += a
  state[1] += b
  state[2] += c
  state[3] += d
}
function init() {
  count[0] = count[1] = 0
  state[0] = 1732584193
  state[1] = 4023233417
  state[2] = 2562383102
  state[3] = 271733878
  for (i = 0; i < digestBits.length; i++)
  digestBits[i] = 0
}
function update(b) {
  var index,
  i
  index = and(shr(count[0], 3), 63)
  if (count[0] < 4294967295 - 7)
  count[0] += 8
  else {
    count[1]++
    count[0] -= 4294967295 + 1
    count[0] += 8
  }
  buffer[index] = and(b, 255)
  if (index >= 63) {
    transform(buffer, 0)
  }
}
function finish() {
  var bits = new Array(8)
  var padding
  var i = 0,
  index = 0,
  padLen = 0
  for (i = 0; i < 4; i++) {
    bits[i] = and(shr(count[0], (i * 8)), 255)
  }
  for (i = 0; i < 4; i++) {
    bits[i + 4] = and(shr(count[1], (i * 8)), 255)
  }
  index = and(shr(count[0], 3), 63)
  padLen = (index < 56) ? (56 - index)  : (120 - index)
  padding = new Array(64)
  padding[0] = 128
  for (i = 0; i < padLen; i++)
  update(padding[i])
  for (i = 0; i < 8; i++)
  update(bits[i])
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      digestBits[i * 4 + j] = and(shr(state[i], (j * 8)), 255)
    }
  }
}
function hexa(n) {
  var hexa_h = '0123456789abcdef'
  var hexa_c = ''
  var hexa_m = n
  for (hexa_i = 0; hexa_i < 8; hexa_i++) {
    hexa_c = hexa_h.charAt(Math.abs(hexa_m) % 16) + hexa_c
    hexa_m = Math.floor(hexa_m / 16)
  }
  return hexa_c
}
var ascii = '01234567890123456789012345678901' +
' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
'[\\]^_`abcdefghijklmnopqrstuvwxyz{|}' +
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' +
'¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝ' +
'Þßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'
var hash = new Array(8)
function MD5(input)
{
  var l,
  s,
  k
  init()
  for (k = 0; k < input.length; k++) {
    l = input.charAt(k)
    update(ascii.lastIndexOf(l))
  }
  finish()
  ka = kb = kc = kd = 0
  for (i = 0; i < 4; i++) ka += shl(digestBits[15 - i], (i * 8))
  for (i = 4; i < 8; i++) kb += shl(digestBits[15 - i], ((i - 4) * 8))
  for (i = 8; i < 12; i++) kc += shl(digestBits[15 - i], ((i - 8) * 8))
  for (i = 12; i < 16; i++) kd += shl(digestBits[15 - i], ((i - 12) * 8))
  s = hexa(kd) + hexa(kc) + hexa(kb) + hexa(ka)
  return s
}
function MD5ByteArray()
{
  var s,
  k
  init()
  for (k = 0; k < hash.length; k++) {
    update(hash[k])
  }
  finish()
  ka = kb = kc = kd = 0
  for (i = 0; i < 4; i++) ka += shl(digestBits[15 - i], (i * 8))
  for (i = 4; i < 8; i++) kb += shl(digestBits[15 - i], ((i - 4) * 8))
  for (i = 8; i < 12; i++) kc += shl(digestBits[15 - i], ((i - 8) * 8))
  for (i = 12; i < 16; i++) kd += shl(digestBits[15 - i], ((i - 12) * 8))
  s = hexa(kd) + hexa(kc) + hexa(kb) + hexa(ka)
  return s
}
var passphrase = ''
var newpass = ''
function otpfoldregs() {
  var ac,
  bd,
  i
  ac = xor(kd, kb)
  bd = xor(kc, ka)
  for (i = 3; i > - 1; i--) {
    hash[i] = and(ac, 255)
    ac = shr(ac, 8)
  }
  for (i = 7; i > 3; i--) {
    hash[i] = and(bd, 255)
    bd = shr(bd, 8)
  }
}
function Otp(n, huella, clau) {
  var tmpseq = n
  var mdc = MD5(huella + clau)
  otpfoldregs(mdc)
  while (tmpseq > 1) {
    mdc = MD5ByteArray()
    otpfoldregs(mdc)
    tmpseq--
  }
  return (hexa(hash[0]).substring(6, 8) + hexa(hash[1]).substring(6, 8) + hexa(hash[2]).substring(6, 8) + hexa(hash[3]).substring(6, 8) + hexa(hash[4]).substring(6, 8) + hexa(hash[5]).substring(6, 8) + hexa(hash[6]).substring(6, 8) + hexa(hash[7]).substring(6, 8))
}
function space(nu) {
  var sp = ''
  for (var s = 1; s <= nu; s++) {
    sp = sp + ' '
  }
  return sp
}
function EsValid(st) {
  var nstr = '0123456789'
  if (st.length > 0) {
    for (var f = 0; f < st.length; f++) {
      chr = st.charAt(f)
      if (nstr.indexOf(chr, 0) == - 1) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}
function EsValid2(st) {
  var nstr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÇçÑñ'
  if (st.length > 0) {
    for (var f = 0; f < st.length; f++) {
      chr = st.charAt(f)
      if (nstr.indexOf(chr, 0) == - 1) {
        return chr
      }
    }
    return 99
  } else {
    return 99
  }
}
function Esborrar() {
  if (funciona) {
    pin.value = ''
  }
}


function rellena() {
  for (var yy = 1; yy <= 2; yy++) {
    if (document.forms[0].elements[yy].checked) {
      document.forms[0].CREDITO.value = document.forms[0].elements[yy].value
    }
  }
}
function validate(id, seed, pin, iter, pinenc, lon, lonpas) {
  if (id.value.length == 0) AddError(errors[6])
  if ((pin.value == '') || (pin.value == 'null')) AddError(errors[13])
  if (pin.value.length < 4 || pin.value.length > lonpas) AddError(errors[9])
  if (EsValid2(pin.value) != 99 || EsValid2(pin.value) == ' ') {
    AddError(errors[10] + EsValid2(pin.value) + errors[11] + errors[12])
  } //VGC
   else {
    autenticate(seed, iter, pin, pinenc, lon)
    funciona = false
  }
}
function validateCLO(id, seed, pin, iter, pinenc, a, b) {
  if (id.value.length == 0) AddError(errors[6])
  if ((pin.value == '') || (pin.value == 'null')) AddError(errors[1])
  if (pin.value.length != 4) AddError(errors[3])
  if (!EsValid(pin.value)) AddError(errors[2])
  else {
    autenticate(seed, iter, pin, pinenc, 8)
    funciona = false
  }
}
function ValidaPins(pin_nou, pin_confir, longP) {
  if (pin_nou.value != pin_confir.value) AddError(errors[7])
  if ((pin_nou.value == '') || (pin_nou.value == 'null')) AddError(errors[8])
  if ((pin_nou.value.length < 4) || (pin_confir.value.length < 4)) AddError(errors[3])
  if (!EsValid(pin_nou.value) || !EsValid(pin_confir.value)) AddError(errors[2])
}
function ValidaPasswords(pin_nou, pin_confir, longP) {
  if ((pin_nou.value == '') || (pin_nou.value == 'null')) AddError(errors[8])
  else
  {
    if (pin_nou.value.length < 4)
    {
      if (longP == 4) AddError(errors[9])
      else AddError(errors[10])
    }
    res = EsValid2(pin_nou.value)
    if (res != 99) AddError(errors[11] + res + errors[12] + errors[13])
    if (pin_nou.value != pin_confir.value) AddError(errors[7])
  }
}

function autenticate(seed, cParam, passw, lon) {
  if (lon == null || lon == '') lon = 8
  var seq = cParam;
  var seedww = seed;
  var passphrase = passw;
  var pas = passphrase + space(lon - parseInt(passw.length));
  if (passphrase.length < lon) {
    otp = Otp(parseInt(seq, 10), seedww, pas)
  } else {
    otp = Otp(parseInt(seq, 10), seedww, passphrase)
  }
  return otp;
}


/**
 * node caixa_encrypter.js "+" "BB40E8D1E2D4BD31" "001" "0000000000000000"  "489500" 48
 */
(function () {
    var oper =  process.argv[2];
    var aParam = process.argv[3];
    var cParam = process.argv[4];
    var dParam = process.argv[5];
    var passw = process.argv[6];
    var lon = process.argv[7];
    
    var seed = revertir(oper, aParam, dParam);

    var encrypted = autenticate(seed, cParam, passw, lon);
    console.log(seed + " " + encrypted);
})();

