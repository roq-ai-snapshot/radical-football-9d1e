import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getParentChildById } from 'apiSdk/parent-children';
import { Error } from 'components/error';
import { ParentChildInterface } from 'interfaces/parent-child';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function ParentChildViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ParentChildInterface>(
    () => (id ? `/parent-children/${id}` : null),
    () =>
      getParentChildById(id, {
        relations: ['user_parent_child_parent_idTouser', 'user_parent_child_child_idTouser'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Parent Child Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Created At:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.created_at as unknown as string}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Updated At:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.updated_at as unknown as string}
            </Text>
            <br />
            {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  User Parent Child Parent Id Touser:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/users/view/${data?.user_parent_child_parent_idTouser?.id}`}>
                    {data?.user_parent_child_parent_idTouser?.email}
                  </Link>
                </Text>
              </>
            )}
            {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  User Parent Child Child Id Touser:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/users/view/${data?.user_parent_child_child_idTouser?.id}`}>
                    {data?.user_parent_child_child_idTouser?.email}
                  </Link>
                </Text>
              </>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'parent_child',
  operation: AccessOperationEnum.READ,
})(ParentChildViewPage);
