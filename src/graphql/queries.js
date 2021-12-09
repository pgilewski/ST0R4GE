/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPicture = /* GraphQL */ `
  query GetPicture($id: ID!) {
    getPicture(id: $id) {
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
export const listPictures = /* GraphQL */ `
  query ListPictures(
    $filter: ModelPictureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        createdAt
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
