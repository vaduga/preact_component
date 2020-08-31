// import { html, render, Component } from 'https://unpkg.com/htm/preact/index.mjs?module'
//yarn build
import { render, Component } from 'preact';

import { html } from 'htm/react';

import Person from './components/person.js';

console.log('Привет, Мир!');

class App extends Component {
	state = {
		persons: [ { id: 0, name: 'MaryxxxJ', age: 10, end: 2 }, { id: 1, name: 'Jane', age: 15, end: 5 } ]
	};

	increase = (name) => {
		console.log(name + ' minus');

		this.setState((prevState) => ({
			persons: prevState.persons.map((el) => (el.name === name ? { ...el, age: el.age + 1 } : el))
		}));
	};

	decrease = (name) => {
		console.log(name + ' plus');
		this.setState((prevState) => ({
			persons: prevState.persons.map((el) => (el.name === name ? { ...el, age: el.age - 1 } : el))
		}));
	};

	render() {
		const f = () => console.log('clicker');
		const list = this.state.persons.map(
			(person) => html`
<${Person}
				name=${person.name}
				age=${person.age}
				end=${person.end}
				clickPlus=${() => this.increase(person.name)}
				clickMinus=${() => this.decrease(person.name)}
			/>`
		);

		return html`
		<div>
			<h1>Hello, Wosrldаа!</h1>
			${list}
		</div>
	`;
	}
}

render(html`<${App}/>`, document.querySelector('#root'));
