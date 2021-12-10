/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
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
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
