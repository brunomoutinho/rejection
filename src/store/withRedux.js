import { Provider } from 'react-redux';
import { configure } from './configure.js';

export const withRedux = (Component) => (props) => {
	const store = configure();
	return (
		<Provider store={store}>
			<Component {...props} />
		</Provider>
	);
};
