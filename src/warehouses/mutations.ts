import { warehouseErrorFragment } from "@saleor/fragments/errors";
import { warehouseDetailsFragment } from "@saleor/fragments/warehouses";
import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  WarehouseCreate,
  WarehouseCreateVariables
} from "./types/WarehouseCreate";
import {
  WarehouseDelete,
  WarehouseDeleteVariables
} from "./types/WarehouseDelete";
import {
  WarehouseUpdate,
  WarehouseUpdateVariables
} from "./types/WarehouseUpdate";

const deleteWarehouse = gql`
  ${warehouseErrorFragment}
  mutation WarehouseDelete($id: ID!) {
    deleteWarehouse(id: $id) {
      errors {
        ...WarehouseErrorFragment
      }
    }
  }
`;
export const useWarehouseDelete = makeMutation<
  WarehouseDelete,
  WarehouseDeleteVariables
>(deleteWarehouse);

const createWarehouse = gql`
  ${warehouseDetailsFragment}
  ${warehouseErrorFragment}
  mutation WarehouseCreate($input: WarehouseCreateInput!) {
    createWarehouse(input: $input) {
      errors {
        ...WarehouseErrorFragment
      }
      warehouse {
        ...WarehouseDetailsFragment
      }
    }
  }
`;
export const useWarehouseCreate = makeMutation<
  WarehouseCreate,
  WarehouseCreateVariables
>(createWarehouse);

const createVendorWarehouse = gql`
  mutation vendorWarehouseCreate($input: VendorWarehouseInput!) {
    createVendorwarehouse(input: $input) {
      errors {
        field
        message
        code
      }
      vendorWarehouse {
        id
        warehouse{
          name
        }
      }
    }
  }
`;
export const useVendorWarehouseCreate = makeMutation<
  createVendorWarehouse, 
  VendorWarehouseVariables
>(createVendorWarehouse);


const updateWarehouse = gql`
  ${warehouseDetailsFragment}
  ${warehouseErrorFragment}
  mutation WarehouseUpdate($id: ID!, $input: WarehouseUpdateInput!) {
    updateWarehouse(id: $id, input: $input) {
      errors {
        ...WarehouseErrorFragment
      }
      warehouse {
        ...WarehouseDetailsFragment
      }
    }
  }
`;
export const useWarehouseUpdate = makeMutation<
  WarehouseUpdate,
  WarehouseUpdateVariables
>(updateWarehouse);
