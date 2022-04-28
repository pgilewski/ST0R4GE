# React + AWS Amplify Gallery app with Rekognition, Authentication and tagging

Link to demo: [https://main.d2hjyas9gj2dki.amplifyapp.com/](https://main.d2hjyas9gj2dki.amplifyapp.com/)


## To reproduce locally:

Clone github repository: [https://github.com/pgilewski/my-space](https://github.com/pgilewski/my-space)

### Prerequirements:

- node 14.18.0
- npm 6.14.15

### `npm install -g @aws-amplify/cli`

### `amplify config`

### `amplify init`

- Use default settings

### `amplify add auth`

- Default configuration / default configuration with social providers (require addictional configuration)
- Email
- Enter your redirect signin URI (eg. http://localhost:3000/)
- No
- Enter your redirect signout URI (eg. http://localhost:3000/)
- Select google and facebook using space, then enter.
- Enter your Facebook App ID for your OAuth flow:
- Enter your Facebook App Secret for your OAuth flow:
- Enter your Google Web Client ID for your OAuth flow:
- Enter your Google Web Client Secret for your OAuth flow:

- No, I am done.

### `amplify add api`

- GraphQL
- (your_api_name)
- Amazon Cognito User Pool
- No, I am done
- No
- Single objects with fields
- Do you want to edit the schema now? Yes
  if file didnt pop out go to /amplify/backend/api/(your_api_name)/schema.grahpql and change existing file to following:

```
type S3Object {
  bucket: String!
  region: String!
  key: String!
}

type File @model @auth(rules: [{ allow: owner }]) @aws_cognito_user_pools {
  id: ID!
  name: String
  owner: String
  labels: [String]
  file: S3Object
  type: String
  createdAt: String
  size: Int
}

type Social {
  name: String!
  url: String!
}

type Profile @model @auth(rules: [{ allow: owner }]) @aws_cognito_user_pools {
  id: ID!
  email: String!
  identityId: String!
  name: String
  profilePic: S3Object
  backgroundPic: S3Object
  bio: String
  socials: [Social]
}


```

### `amplify add storage`

- Content
- (default_category)
- (default_bucket_name)
- Auth users only
- select 'create/update, read, delete' using space
- No

### `amplify add predictions`

- Identify
- Identify Labels
- (deafult_name)
- Default Configuration
- Auth users only

### `amplify push`

- Yes
- javascript
- (deafult)
- Yes
- 2
  To push changes.

Check mutations,queries, etc. to build locally.

Last changes you need to make is to go to your [AWS Console](https://eu-central-1.console.aws.amazon.com/amplify/home?region=eu-central-1#/)
Select Cognito from services
Manage User Pools
Select your created user pool
In General setting select Message Customizations
Then set Verification type to Link.
Save changes.
