import { appMutate } from '../appRequest';
import { gql } from 'graphql-tag';

export const portfoliosRemoveMultiple = () =>
  appMutate(gql`
	mutation PortfoliosRemoveMultiple($_id: ObjectId[]) {
		_id
	}
`);
