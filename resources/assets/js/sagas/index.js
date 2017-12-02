import { all } from 'redux-saga/effects';

function* test() {
	yield;
}

export default function* () {
	yield all([
		test()
	]);
}