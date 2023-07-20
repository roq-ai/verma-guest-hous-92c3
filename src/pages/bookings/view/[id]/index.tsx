import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';

import { getBookingById } from 'apiSdk/bookings';
import { BookingInterface } from 'interfaces/booking';

function BookingViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BookingInterface>(
    () => (id ? `/bookings/${id}` : null),
    () =>
      getBookingById(id, {
        relations: ['room', 'user'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Bookings',
              link: '/bookings',
            },
            {
              label: 'Booking Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper>
              <Stack direction="column" spacing={2} mb={4}>
                <Text
                  sx={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: 'base.content',
                  }}
                >
                  Booking Details
                </Text>
              </Stack>
              <List spacing={3} w="100%">
                <FormListItem label="Start Date:" text={data?.start_date as unknown as string} />

                <FormListItem label="End Date:" text={data?.end_date as unknown as string} />

                <FormListItem label="Created At:" text={data?.created_at as unknown as string} />

                <FormListItem label="Updated At:" text={data?.updated_at as unknown as string} />

                {hasAccess('room', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Room:"
                    text={
                      <Link as={NextLink} href={`/rooms/view/${data?.room?.id}`}>
                        {data?.room?.status}
                      </Link>
                    }
                  />
                )}
                {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="User:"
                    text={
                      <Link as={NextLink} href={`/users/view/${data?.user?.id}`}>
                        {data?.user?.email}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'booking',
    operation: AccessOperationEnum.READ,
  }),
)(BookingViewPage);
