//import { html } from 'https://unpkg.com/htm/preact/index.mjs?module'
import { h } from 'preact';

import { html } from 'htm/preact';

export default function Person(props) {
	
	return (
		<div class="person">
			<h1>{props.name}</h1>
			<p>Возраст : {props.age}</p>
			<p>end: {props.end}</p>
			<button onClick={props.clickPlus}>Больше</button>
			<button onClick={props.clickMinus}>Меньше</button>
			
		</div>
	)
}