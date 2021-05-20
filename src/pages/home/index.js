import compose from 'lodash/fp/compose';
import { PageHOC } from '../pageHOC.js';
import { AddQuestionForm } from '../../components/addQuestion/index.js';
import { ListOfQuestions } from '../../components/listOfQuestions/index.js';
import { Score } from '../../components/score/index.js';
import { CurrentStreak } from '../../components/currentStreak/index.js';

import './index.css';

let Home = () => (
	<div className="rejection-app-container">
		<header className={'header'}>
			<h1 className={'header__title'}>Rejection App</h1>
		</header>
		<AddQuestionForm positionClass={'form'} />
		<ListOfQuestions positionClass={'list'} />
		<Score positionClass={'score'} />
		<CurrentStreak positionClass={'streak'} />
	</div>
);

Home = compose(PageHOC)(Home);

export { Home };