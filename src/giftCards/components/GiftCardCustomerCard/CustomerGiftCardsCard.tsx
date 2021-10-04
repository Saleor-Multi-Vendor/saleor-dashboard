import { Button, Card, CardActions } from "@material-ui/core";
import VerticalSpacer from "@saleor/apps/components/VerticalSpacer";
import CardTitle from "@saleor/components/CardTitle";
import GiftCardCreateDialog from "@saleor/giftCards/GiftCardCreateDialog/GiftCardCreateDialog";
import { mapEdgesToItems } from "@saleor/utils/maps";
import { useContext } from "hoist-non-react-statics/node_modules/@types/react";
import * as React from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import CustomerGiftCardsList from "./CustomerGiftCardsList";
import { giftCardCustomerCardMessages as messages } from "./messages";
import { CustomerGiftCardContext } from "./providers/CustomerGiftCardProvider";
import {
  CUSTOMER_GIFT_CARD_LIST_QUERY,
  useCustomerGiftCardQuery
} from "./queries";

interface CustomerGiftCardsCardProps {
  customerId?: string | null;
}

interface CustomerGiftCardsCardActionsProps {
  buttonPosition: "left" | "right";
}

const useStyles = makeStyles(
  theme => ({
    cardActions: {
      padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
      flexDirection: ({ buttonPosition }: CustomerGiftCardsCardActionsProps) =>
        buttonPosition === "left" ? "row" : "row-reverse"
    }
  }),
  { name: "CustomerGiftCardsCard" }
);

const CustomerGiftCardsCard: React.FC<CustomerGiftCardsCardProps> = () => {
  const { id } = useContext(CustomerGiftCardContext);

  const { data, loading } = useCustomerGiftCardQuery({
    variables: {
      first: 5,
      filter: {
        usedBy: [id]
      }
    }
  });
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const closeCreateDialog = () => setOpenCreateDialog(false);

  const giftCards = mapEdgesToItems(data?.giftCards);

  const classes = useCardActionsStyles({
    buttonPosition: giftCards?.length > 0 ? "right" : "left"
  });

  const handleViewAllButton = () => {
    // history push to filtered gift cards
  };

  const handleCreateNewCardButton = () => {
    // oepn issue new card modal
    setOpenCreateDialog(true);
  };

  return (
    <Card>
      <CardTitle
        title="Gift Cards"
        toolbar={
          !!giftCards?.length && (
            <Button
              variant="text"
              color="primary"
              onClick={handleViewAllButton}
            >
              <FormattedMessage {...messages.customerGiftCardsViewAllButton} />
            </Button>
          )
        }
      >
        <FormattedMessage
          {...{
            ...(!!giftCards?.length
              ? messages.customerGiftCardsPresentSubtitle
              : messages.customerGiftCardsAbsentSubtitle)
          }}
        />
        <VerticalSpacer spacing={2} />
      </CardTitle>
      <CustomerGiftCardsList giftCards={giftCards} loading={loading} />
      <CardActions className={classes.cardActions}>
        <Button
          variant="text"
          color="primary"
          onClick={handleCreateNewCardButton}
        >
          {getCardSubtitle()}
          <VerticalSpacer spacing={2} />
        </CardTitle>
        <CustomerGiftCardsList giftCards={giftCards} loading={loading} />
        <CardActions className={classes.cardActions}>
          <Button
            variant="text"
            color="primary"
            onClick={handleCreateNewCardButton}
          >
            <FormattedMessage
              {...messages.customerGiftCardsIssueNewCardButton}
            />
          </Button>
        </CardActions>
      </Card>
      <GiftCardCreateDialog
        open={openCreateDialog}
        closeDialog={closeCreateDialog}
        refetchQueries={[CUSTOMER_GIFT_CARD_LIST_QUERY]}
      />
    </>
  );
};

export default CustomerGiftCardsCard;
