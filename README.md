# slashterix
Slashterix: the comment based "template system" for ES6

slashterix-templates is a comment based "template system for ES6.

It leverages ES6 template strings to allow you to write HTML templates directly in javascript functions as comments. For example:

```
element.innerHTML = /*template with data
	<ul>
		for item in data
        	if item.size === 'large' then
            	<li class="icn-big">${item.title}</li>
            else
            	<li class="icn-small">${item.title}</li>
            endif
        endfor
     </ul>

```
