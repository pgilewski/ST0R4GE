/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPicture = /* GraphQL */ `
  mutation CreatePicture(
    $input: CreatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    createPicture(input: $input, condition: $condition) {
      id
      name
      owner
      labels
      file {
        bucket
        region
        key
        type
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePicture = /* GraphQL */ `
  mutation UpdatePicture(
    $input: UpdatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    updatePicture(input: $input, condition: $condition) {
      id
      name
      owner
      labels
      file {
        bucket
        region
        key
        type
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePicture = /* GraphQL */ `
  mutation DeletePicture(
    $input: DeletePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    deletePicture(input: $input, condition: $condition) {
      id
      name
      owner
      labels
      file {
        bucket
        region
        key
        type
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
      id
      email
      identityId
      name
      profilePic {
        bucket
        region
        key
        type
      }
      backgroundPic {
        bucket
        region
        key
        type
      }
      bio
      socials {
        name
        url
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      email
      identityId
      name
      profilePic {
        bucket
        region
        key
        type
      }
      backgroundPic {
        bucket
        region
        key
        type
      }
      bio
      socials {
        name
        url
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
      id
      email
      identityId
      name
      profilePic {
        bucket
        region
        key
        type
      }
      backgroundPic {
        bucket
        region
        key
        type
      }
      bio
      socials {
        name
        url
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
