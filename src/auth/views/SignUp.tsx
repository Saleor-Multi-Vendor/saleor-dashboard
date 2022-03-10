import React, { useEffect, useState } from "react";

import { FormattedMessage, useIntl } from "react-intl";

import {
  LoginUrlQueryParams,
  loginUrl
} from "../urls";
import {
    Button,
    CircularProgress,
    Divider,
    TextField,
    Typography
  } from "@material-ui/core";
import {
    APP_MOUNT_URI,
    DEFAULT_INITIAL_PAGINATION_DATA,
    DEFAULT_INITIAL_SEARCH_DATA
  } from "@saleor/config";
import urlJoin from "url-join";

import useNavigator from "@saleor/hooks/useNavigator";
import { commonMessages } from "@saleor/intl";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { makeStyles } from "@saleor/macaw-ui";
import StaffAddMemberDialog, {
  AddMemberFormData
} from "../components/StaffAddMemberDialog";
import { newPasswordUrl } from "@saleor/auth/urls";

import SignUpForm, { LoginFormData } from "../components/SignUp/form";
import { FormSpacer } from "@saleor/components/FormSpacer";
import { useStaffMemberVendorAddMutation } from "../../staff/mutations";
import { useCreateVendor } from '../../warehouses/mutations'
const useStyles = makeStyles(
    theme => ({
      buttonContainer: {
        display: "flex",
        justifyContent: "flex-end"
      },
      link: {
        color: theme.palette.primary.main,
        cursor: "pointer",
        textDecoration: "underline"
      },
      loading: {
        alignItems: "center",
        display: "flex",
        minHeight: "80vh",
        justifyContent: "center"
      },
      loginButton: {
        width: 140
      },
      panel: {
        "& span": {
          color: theme.palette.error.contrastText
        },
        background: theme.palette.error.main,
        borderRadius: theme.spacing(),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1.5)
      }
    }),
    { name: "LoginCard" }
  );

interface LoginViewProps {
  params: LoginUrlQueryParams;
  //onSubmit?: (event: LoginFormData) => SubmitPromise;

}
const initialForm: AddMemberFormData = {
  email: "",
  firstName: "",
  lastName: "",
  permissionGroups: [],
  password:""
};

const SignUpView: React.FC<LoginViewProps> = (props) => {
    // const {onSubmit} = props;
    const [createVendor, createVendorOpts] = useCreateVendor({
      onCompleted: data => {
           
   
    }})
    console.log('hello', 
      window.location.origin,
 
    
    )
    const [addStaffMember, addStaffMemberData] = useStaffMemberVendorAddMutation({
      onCompleted: data => {
        console.log('data received', data)
        if (data.vendorStaffCreate.errors.length === 0) {
          console.log('data received inside')
          createVendor({
            variables: {
              input: {
                user: data.vendorStaffCreate.user.id,
                shopName: "daraz"
                }  
              }
          })
        //   notify({
        //     status: "success",
        //     text: intl.formatMessage(commonMessages.savedChanges)
        //   });
        //  navigate(staffMemberDetailsUrl(data.staffCreate.user.id));
        }
      }
    });
  
    const onSubmit = (variables: AddMemberFormData) => addStaffMember({
      variables: {
        input: {
          //addGroups: variables.permissionGroups,
          addGroups:[],
          email: variables.email,
          firstName: variables.firstName,
          lastName: variables.lastName,
          password: variables.password,
          redirectUrl:  urlJoin(
            window.location.origin,
            APP_MOUNT_URI === "/" ? "" : APP_MOUNT_URI,
            newPasswordUrl().replace(/\?/, "")
          )
      }
    }}
    )



  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigator();
   
  return (
    <SignUpForm initial={initialForm} onSubmit={onSubmit}>
    {({ change: handleChange, data, submit: handleSubmit }) => (
      <>
    <TextField
          autoFocus
          fullWidth
          autoComplete="firstName"
          label={intl.formatMessage(commonMessages.firstName)}
          name="firstName"
          onChange={handleChange}
          value={data.firstName}
          inputProps={{
            "data-test": "firstName"
          }}
          disabled={false}
        />
          <TextField
          autoFocus
          fullWidth
          autoComplete="lastName"
          label={intl.formatMessage(commonMessages.lastName)}
          name="lastName"
          onChange={handleChange}
          value={data.lastName}
          inputProps={{
            "data-test": "lastName"
          }}
          disabled={false}
        />
        <TextField
          autoFocus
          fullWidth
          autoComplete="username"
          label={intl.formatMessage(commonMessages.email)}
          name="email"
          onChange={handleChange}
          value={data.email}
          inputProps={{
            "data-test": "email"
          }}
          disabled={false}
        />
        <FormSpacer />
        <TextField
          fullWidth
          autoComplete="password"
          label={intl.formatMessage({
            defaultMessage: "Password"
          })}
          name="password"
          onChange={handleChange}
          type="password"
          value={data.password}
          inputProps={{
            "data-test": "password"
          }}
          disabled={false}
        />
        <FormSpacer />
        <TextField
          fullWidth
          autoComplete="password"
          label={intl.formatMessage({
            defaultMessage: "Confirm Password"
          })}
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          value={data.confirmPassword}
          inputProps={{
            "data-test": "confirmPassword"
          }}
          disabled={false}
        />
        <FormSpacer />
        <div className={classes.buttonContainer}>
          <Button
            className={classes.loginButton}
            color="primary"
            disabled={false}
            variant="contained"
            onClick={handleSubmit}
            type="submit"
            data-test="submit"
          >
            <FormattedMessage defaultMessage="Sign Up" description="button" />
          </Button>
        </div>
        <FormSpacer />
        <Typography>
          <FormattedMessage
            defaultMessage="Already have account? {signUpLink}" 
            description="description"
            values={{
              signUpLink: (
                <a className={classes.link} onClick={()=>navigate(loginUrl)}>
                  <FormattedMessage
                    defaultMessage="Back to login"
                    description="link"
                  />
                </a>
              )
            }}
          />
        </Typography>
 
      </>
    )}
  </SignUpForm>
  );
};
SignUpView.displayName = "SignUpView";
export default SignUpView;
