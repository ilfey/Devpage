/*
 * Created on Sat Oct 14 2023
 *
 * Copyright (c) 2023 ilfey <ilfey.local@gmail.com>
 */

const PLUS = 'PLUS',
	MINUS = 'MINUS',
	MULTIPLICATION = 'MULTIPLICATION',
	DIVISION = 'DIVISION'

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	FACTOR_KEYS = ['s', 'c', 'a', 'p', 'e', '*', '^'],
	TERM_KEYS = ['*', '/', 's', 'c'],
	EXPRESSION_KEYS = ['+', '-']

export interface MathParserError extends Error {
	string: string
}

/* 
Expression ::= Term[{+|-}Term]...
Term ::= Factor[{*|/}Factor]...
Factor ::= e|pi|{sin|cos|asin|acos}(Number)|Number|(Expression)
Number ::= {0|1|2|3|4|5|6|7|8|9}...
*/

export class MathParser {
	private static source = ''
	private static index = 0

	/**
	 * Throws an error with a specific message when encountering an unknown character.
	 * @returns {never} - This function never returns normally.
	 */
	private static throwError(): never {
		const err = new Error(`Unknown character: "${this.source[this.index]}"`) as MathParserError

		err.string = `${this.source}\n${'^'.padStart(this.index + 1)}\nUnknown character: "${
			this.source[this.index]
		}"`

		throw err
	}

	/**
	 * If current index value equals returns invoke `fn`
	 * @param {string} symbol
	 * @callback fn - Callback function that returns number if current char equals `symbol`
	 * @returns {number | never}
	 */
	private static checkSymbol(symbol: string, fn: () => number): number | never {
		if (this.source[this.index] === symbol) {
			return fn?.call(this)
		}

		this.throwError()
	}

	/**
	 * Convert degrees to radians
	 * @param {number} deg - Degrees
	 * @returns {number}
	 */
	private static degreesToRadians(deg: number): number {
		return deg * (Math.PI / 180)
	}

	/**
	 * Convert radians to degrees
	 * @param {number} rad - Radians
	 * @returns {number}
	 */
	private static radiansToDegrees(rad: number): number {
		return rad * (Math.PI / 180)
	}

	/**
	 * Returns factor.
	 * Factor ::= {sin|cos|asin|acos}(Number)|Number|(Expression)
	 * @returns {number}
	 */
	private static factor(): number {
		let number = '0'
		while (this.index < this.source.length) {
			const char = this.source[this.index]

			if (char === ' ') {
				++this.index
				continue
			}

			if (FACTOR_KEYS.includes(char)) {
				if (this.source.startsWith('sin(', this.index)) {
					this.index += 4
					const factor = this.factor()

					return this.checkSymbol(')', () => Math.sin(this.degreesToRadians(factor)))
				} else if (this.source.startsWith('cos(', this.index)) {
					this.index += 4
					const factor = this.factor()

					return this.checkSymbol(')', () => Math.cos(this.degreesToRadians(factor)))
				} else if (this.source.startsWith('asin(', this.index)) {
					this.index += 5
					const factor = this.factor()

					return this.checkSymbol(')', () => this.radiansToDegrees(Math.asin(factor)))
				} else if (this.source.startsWith('acos(', this.index)) {
					this.index += 5
					const factor = this.factor()

					return this.checkSymbol(')', () => this.radiansToDegrees(Math.acos(factor)))
				} else if (char === 'e') {
					++this.index

					return Math.E
				} else if (this.source.startsWith('pi', this.index)) {
					this.index += 2

					return Math.PI
				} else if (this.source.startsWith('**', this.index)) {
					this.index += 2

					return Math.pow(parseInt(number), this.term())
				} else if (this.source.startsWith('^', this.index)) {
					++this.index

					return Math.pow(parseInt(number), this.factor())
				} else {
					// Skip multiplication
					if (char === '*') {
						break
					}

					this.throwError()
				}
			}

			if (char === '(') {
				++this.index
				const expression = this.expression()

				return this.checkSymbol(')', () => {
					++this.index
					return expression
				})
			}

			if (NUMBERS.includes(char)) {
				number += char
				++this.index
			} else {
				break
			}
		}

		return parseInt(number)
	}

	/**
	 * Returns term.
	 * Term ::= Factor[{*|/}Factor]...
	 * @returns {number}
	 */
	private static term(): number {
		let term = this.factor()

		// Skip spaces
		while (this.source[this.index] === ' ') {
			++this.index
		}

		while (TERM_KEYS.includes(this.source[this.index])) {
			let operator
			if (this.source.startsWith('*', this.index)) {
				++this.index

				operator = MULTIPLICATION
			} else if (this.source.startsWith('/', this.index)) {
				++this.index

				operator = DIVISION
			} else {
				this.throwError()
			}

			const factor = this.factor()

			switch (operator) {
				case MULTIPLICATION:
					term *= factor
					break
				case DIVISION:
					term /= factor
					break
			}
		}

		return term
	}

	/**
	 * Returns expression.
	 * Expression ::= Term[{+|-}Term]...
	 * @returns {number}
	 */
	private static expression(): number {
		let expression = this.term()

		// Skip spaces
		while (this.source[this.index] === ' ') {
			++this.index
		}

		while (EXPRESSION_KEYS.includes(this.source[this.index])) {
			let operator
			if (this.source.startsWith('+', this.index)) {
				operator = PLUS
			} else if (this.source.startsWith('-', this.index)) {
				operator = MINUS
			} else {
				this.throwError()
			}

			++this.index

			const term = this.term()

			if (operator === PLUS) {
				expression += term
			} else {
				expression -= term
			}
		}

		if (this.index != this.source.length && this.source[this.index] != ')') {
			this.throwError()
		}

		return expression
	}

	/**
	 * Parse math expression.
	 * @param {string} src - source string
	 * @returns {number}
	 */
	static parse(src: string): number {
		this.source = src
		this.index = 0

		return this.expression()
	}
}
