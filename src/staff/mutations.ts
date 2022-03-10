import {
  accountErrorFragment,
  staffErrorFragment
} from "@saleor/fragments/errors";
import { staffMemberDetailsFragment2, staffMemberDetailsFragment } from "@saleor/fragments/staff";
import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  ChangeStaffPassword,
  ChangeStaffPasswordVariables
} from "./types/ChangeStaffPassword";
import { StaffAvatarDelete } from "./types/StaffAvatarDelete";
import {
  StaffAvatarUpdate,
  StaffAvatarUpdateVariables
} from "./types/StaffAvatarUpdate";
import {
  StaffMemberAdd,
  StaffMemberAddVariables,
  StaffMemberVendorAdd,
  StaffMemberVendorAddVariables
} from "./types/StaffMemberAdd";
import {
  StaffMemberDelete,
  StaffMemberDeleteVariables
} from "./types/StaffMemberDelete";
import {
  StaffMemberUpdate,
  StaffMemberUpdateVariables
} from "./types/StaffMemberUpdate";

const staffMemberAddMutation = gql`
  ${staffErrorFragment}
  ${staffMemberDetailsFragment}
  mutation StaffMemberAdd($input: StaffVendorCreateInput!) {
    staffCreate(input: $input) {
      errors {
        ...StaffErrorFragment
      }
      user {
        ...StaffMemberDetailsFragment
      }
      redirectUrl
    }


  }
`;
export const useStaffMemberAddMutation = makeMutation<
  StaffMemberAdd,
  StaffMemberAddVariables
>(staffMemberAddMutation);

const staffMemberVendorAddMutation = gql`
  ${staffErrorFragment}
  ${staffMemberDetailsFragment}
  mutation StaffMemberVendorAdd($input: StaffVendorCreateInput!) {
    vendorStaffCreate(input: $input) {
      errors {
        ...StaffErrorFragment
      }
      user {
        ...StaffMemberDetailsFragment
      }
    }
  }
`;
export const useStaffMemberVendorAddMutation = makeMutation<
  StaffMemberVendorAdd,
  StaffMemberVendorAddVariables
>(staffMemberVendorAddMutation);

const staffMemberUpdateMutation = gql`
  ${staffErrorFragment}
  ${staffMemberDetailsFragment}
  mutation StaffMemberUpdate($id: ID!, $input: StaffUpdateInput!) {
    staffUpdate(id: $id, input: $input) {
      errors {
        ...StaffErrorFragment
      }
      user {
        ...StaffMemberDetailsFragment
      }
    }
  }
`;



export const TypedStaffMemberUpdateMutation = TypedMutation<
  StaffMemberUpdate,
  StaffMemberUpdateVariables
>(staffMemberUpdateMutation);

const staffMemberDeleteMutation = gql`
  ${staffErrorFragment}
  mutation StaffMemberDelete($id: ID!) {
    staffDelete(id: $id) {
      errors {
        ...StaffErrorFragment
      }
    }
  }
`;
export const TypedStaffMemberDeleteMutation = TypedMutation<
  StaffMemberDelete,
  StaffMemberDeleteVariables
>(staffMemberDeleteMutation);

const staffAvatarUpdateMutation = gql`
  ${accountErrorFragment}
  mutation StaffAvatarUpdate($image: Upload!) {
    userAvatarUpdate(image: $image) {
      errors {
        ...AccountErrorFragment
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;


export const TypedStaffAvatarUpdateMutation = TypedMutation<
  StaffAvatarUpdate,
  StaffAvatarUpdateVariables
>(staffAvatarUpdateMutation);

const staffAvatarDeleteMutation = gql`
  ${accountErrorFragment}
  mutation StaffAvatarDelete {
    userAvatarDelete {
      errors {
        ...AccountErrorFragment
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
export const TypedStaffAvatarDeleteMutation = TypedMutation<
  StaffAvatarDelete,
  StaffMemberDeleteVariables
>(staffAvatarDeleteMutation);

const changeStaffPassword = gql`
  ${accountErrorFragment}
  mutation ChangeStaffPassword($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const useChangeStaffPassword = makeMutation<
  ChangeStaffPassword,
  ChangeStaffPasswordVariables
>(changeStaffPassword);
