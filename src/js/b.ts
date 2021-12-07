import { callAppInterface } from './utils'
import { $ } from './libs/jquery'
import '../css/style.css'

console.log('click B')
callAppInterface('B')

$('#element').on('click', function () {
  console.log('click B')
  callAppInterface('B')
})