import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { ShopErrorFragment } from "@saleor/fragments/types/ShopErrorFragment";
import { getFormErrors } from "@saleor/utils/errors";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { SiteSettingsPageFormData } from "../SiteSettingsPage";
import { messages } from "./messages";

interface SiteCheckoutSettingsProps {
  data: SiteSettingsPageFormData;
  errors: ShopErrorFragment[];
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const SiteCheckoutSettings: React.FC<SiteCheckoutSettingsProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(
    [
      "reserveStockDurationAuthenticatedUser",
      "reserveStockDurationAnonymousUser"
    ],
    errors
  );

  return (
    <Card>
      <CardTitle title={intl.formatMessage(messages.reservedStock)} />
      <CardContent>
        <Typography variant="body2">
          <FormattedMessage {...messages.reservedStockDescription} />
        </Typography>
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.reserveStockDurationAuthenticatedUser}
          type="number"
          fullWidth
          name="reserveStockDurationAuthenticatedUser"
          label={intl.formatMessage(
            messages.stockReservationForAuthenticatedUser
          )}
          helperText={intl.formatMessage(messages.stockWillNotBeReserved)}
          value={data.reserveStockDurationAuthenticatedUser}
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: "none"
            }
          }}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.reserveStockDurationAnonymousUser}
          type="number"
          fullWidth
          name="reserveStockDurationAnonymousUser"
          label={intl.formatMessage(messages.stockReservationForAnonymousUser)}
          helperText={intl.formatMessage(messages.stockWillNotBeReserved)}
          value={data.reserveStockDurationAnonymousUser}
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: "none"
            }
          }}
        />
      </CardContent>
    </Card>
  );
};
SiteCheckoutSettings.displayName = "SiteCheckoutSettings";
export default SiteCheckoutSettings;
