import React from 'react'
import {loginRedirectCall} from './RedirectPathMange';

export default function RedirectBlankPage() {
  return (
    <div>
        {loginRedirectCall()}      
    </div>
  )
}
