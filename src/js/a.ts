import { callAppInterface } from './utils'
import $ from 'jquery'
import '../css/style.css'

$('#element').on('click', function () {
  console.log('click A')
  callAppInterface('A')
})