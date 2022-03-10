import gql from "graphql-tag";

export const staffMemberFragment = gql`
  fragment StaffMemberFragment on User {
    id
    email
    firstName
    isActive
    lastName
  }
`;
export const staffMemberFragment2 = gql`
  fragment StaffMemberFragment2 on User {
    id
    email
    firstName
    isActive
    lastName
    checkoutTokens(channel:"default")
  }
`;
export const staffMemberDetailsFragment = gql`
  ${staffMemberFragment}
  fragment StaffMemberDetailsFragment on User {
    ...StaffMemberFragment
    
    permissionGroups {
      id
      name
      userCanManage
    }
    userPermissions {
      code
      name
    }
    avatar(size: 120) {
      url
    }
  }
`;

export const staffMemberDetailsFragment2 = gql`
  ${staffMemberFragment2}

  fragment StaffMemberDetailsFragment on User {
    ...StaffMemberFragment2
    
    permissionGroups {
      id
      name
      userCanManage
    }
    userPermissions {
      code
      name
    }
    avatar(size: 120) {
      url
    }
  }
`;
