/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile($owner: String) {
    onCreateFile(owner: $owner) {
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
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile($owner: String) {
    onUpdateFile(owner: $owner) {
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
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile($owner: String) {
    onDeleteFile(owner: $owner) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($owner: String) {
    onCreateProfile(owner: $owner) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($owner: String) {
    onUpdateProfile(owner: $owner) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($owner: String) {
    onDeleteProfile(owner: $owner) {
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
