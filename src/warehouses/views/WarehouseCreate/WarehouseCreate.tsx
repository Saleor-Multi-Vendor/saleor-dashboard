import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useShop from "@saleor/hooks/useShop";
import { commonMessages } from "@saleor/intl";
import { findValueInEnum, getMutationStatus } from "@saleor/misc";
import { CountryCode } from "@saleor/types/globalTypes";
import WarehouseCreatePage from "@saleor/warehouses/components/WarehouseCreatePage";
import { useWarehouseCreate , useVendorWarehouseCreate} from "@saleor/warehouses/mutations";
import { warehouseListUrl, warehouseUrl } from "@saleor/warehouses/urls";
import {usegetVendorsList
} from "@saleor/products/queries";
import useUser from "@saleor/hooks/useUser";

import React, {useEffect} from "react";
import { useIntl } from "react-intl";

const WarehouseCreate: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const {
    data: vendors
  } = usegetVendorsList({})
  const user = useUser();
  const currentVendor=vendors?.vendors.edges.filter(vendor=>{
    if (!vendor) return false;
    if (!vendor.node.user) return false;
    return vendor.node.user.email==user?.user.email
  })
    console.log('vendors warehouse vendors created',currentVendor,vendors,user)
    const [createVendorWarehouse, createVendorWarehouseOpts] = useVendorWarehouseCreate({
    onCompleted: data => {
         
  console.log('vendors warehouse vendors created',currentVendor,vendor, user)
  }})

        
// useEffect(()=>{
//     useVendorWarehouseCreate({
//             variables: {
//               input: {
//                 vendorId:"324",
//                 warehouse:'3jsnfodsnf'
//                 }
              
//               }
            
//           })
//     }
// ,[])
  const [createWarehouse, createWarehouseOpts] = useWarehouseCreate({
    onCompleted: data => {

   const warehouseId=data.createWarehouse.warehouse.id;
   console.log('warehouse', warehouseId)
   console.log('vendor', currentVendor)
   const vendorId=currentVendor[0].node.id;
   console.log('vendorId', vendorId)

   console.log('errors and user', user?.user.email, data.createWarehouse.errors)

         if(user?.user.email!="admin@example.com"){
                    console.log('should create vendor warehouse')
                    createVendorWarehouse({
            variables: {
              input: {
                vendorId:vendorId,
                warehouse:warehouseId
                }
              
              }
            
          })
                  }
      if (data.createWarehouse.errors.length === 0) {
        

        navigate(warehouseUrl(data.createWarehouse.warehouse.id));
          notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
   
      }
    }
  });
  const createWarehouseTransitionState = getMutationStatus(createWarehouseOpts);
  

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          defaultMessage: "Create Warehouse",
          description: "header"
        })}
      />
      <WarehouseCreatePage
        countries={shop?.countries || []}
        disabled={createWarehouseOpts.loading}
        errors={createWarehouseOpts.data?.createWarehouse.errors || []}
        saveButtonBarState={createWarehouseTransitionState}
        onBack={() => navigate(warehouseListUrl())}
        onSubmit={data =>
          createWarehouse({
            variables: {
              input: {
                address: {
                  companyName: data.companyName,
                  city: data.city,
                  cityArea: data.cityArea,
                  country: findValueInEnum(data.country, CountryCode),
                  countryArea: data.countryArea,
                  phone: data.phone,
                  postalCode: data.postalCode,
                  streetAddress1: data.streetAddress1,
                  streetAddress2: data.streetAddress2
                },
                name: data.name
              }
            }
          })
        }
      />
    </>
  );
};

WarehouseCreate.displayName = "WarehouseCreate";
export default WarehouseCreate;
