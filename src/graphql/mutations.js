/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFile = /* GraphQL */ `
  mutation CreateFile(
    $input: CreateFileInput!
    $condition: ModelFileConditionInput
  ) {
    createFile(input: $input, condition: $condition) {
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
      type
      createdAt
      size
      updatedAt
    }
  }
`;
export const updateFile = /* GraphQL */ `
  mutation UpdateFile(
    $input: UpdateFileInput!
    $condition: ModelFileConditionInput
  ) {
    updateFile(input: $input, condition: $condition) {
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
      type
      createdAt
      size
      updatedAt
    }
  }
`;
export const deleteFile = /* GraphQL */ `
  mutation DeleteFile(
    $input: DeleteFileInput!
    $condition: ModelFileConditionInput
  ) {
    deleteFile(input: $input, condition: $condition) {
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
      type
      createdAt
      size
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
