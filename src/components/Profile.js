import React from 'react';
import { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import Container from '../components/Container';
import { getProfile } from '../graphql/queries';
import { createProfile } from '../graphql/mutations';

const Profile = (props) =>  {
    const [isCreated, setIsCreated] = useState("loading");
    const { user } = props
    console.log(props)
    const getProfile = async () => {
        /*const profile = await API.graphql(graphqlOperation(getProfile, {input: user }))*/
    }
    const createProfile = async () => {
        const cognitoUser = await Auth.currentAuthenticatedUser()
        const creds = await Auth.currentCredentials()
        const profile = {
            id: cognitoUser.username,
            email: cognitoUser.attributes.email,
            identityId: creds.identityId,
        }
        const response = await API.graphql(graphqlOperation(createProfile, {id: profile.id} ))

    }
    const checkProfile = () => {
    }
    useEffect(() => {
        createProfile()
    },[])

    const onChange = () => {

    }

    return (
        <div>
            <Container>
                <div className="flex w-full justify-center">

                    <input
                        onChange={onChange}
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Your username"/>
                </div>
                <div className="flex w-full justify-right">

                    <button className="ml-auto py-2 px-4  mr-4 lex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border bg-transparent border-green-500 text-green-500 hover:border-green-800 hover:border-green-800 flex items-center hover:shadow-lg font-bold">
                        Save
                    </button>
                </div>
            </Container>
        </div>
    )
}
export default Profile;
