import Amplify from 'aws-amplify';
import awsmobile from './aws-exports'
import Auth from '@aws-amplify/auth';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

Amplify.configure(awsmobile);
Auth.configure(awsmobile);
Amplify.addPluggable(new AmazonAIPredictionsProvider());