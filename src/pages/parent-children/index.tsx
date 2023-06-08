import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Link } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getParentChildren, deleteParentChildById } from 'apiSdk/parent-children';
import { ParentChildInterface } from 'interfaces/parent-child';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function ParentChildListPage() {
  const { hasAccess } = useAuthorizationApi();
  const { data, error, isLoading, mutate } = useSWR<ParentChildInterface[]>(
    () => '/parent-children',
    () =>
      getParentChildren({
        relations: ['user_parent_child_parent_idTouser', 'user_parent_child_child_idTouser'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteParentChildById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Parent Child
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {hasAccess('parent_child', AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
          <Link href={`/parent-children/create`}>
            <Button colorScheme="blue" mr="4">
              Create
            </Button>
          </Link>
        )}
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>created_at</Th>
                  <Th>updated_at</Th>
                  {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>user_parent_child_parent_idTouser</Th>
                  )}
                  {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>user_parent_child_child_idTouser</Th>
                  )}

                  {hasAccess('parent_child', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && <Th>Edit</Th>}
                  {hasAccess('parent_child', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>View</Th>}
                  {hasAccess('parent_child', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && <Th>Delete</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.created_at as unknown as string}</Td>
                    <Td>{record.updated_at as unknown as string}</Td>
                    {hasAccess(
                      'user_parent_child_parent_id_touser',
                      AccessOperationEnum.READ,
                      AccessServiceEnum.PROJECT,
                    ) && (
                      <Td>
                        <Link as={NextLink} href={`/users/view/${record.user_parent_child_parent_idTouser?.id}`}>
                          {record.user_parent_child_parent_idTouser?.email}
                        </Link>
                      </Td>
                    )}
                    {hasAccess(
                      'user_parent_child_child_id_touser',
                      AccessOperationEnum.READ,
                      AccessServiceEnum.PROJECT,
                    ) && (
                      <Td>
                        <Link as={NextLink} href={`/users/view/${record.user_parent_child_child_idTouser?.id}`}>
                          {record.user_parent_child_child_idTouser?.email}
                        </Link>
                      </Td>
                    )}

                    {hasAccess('parent_child', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/parent-children/edit/${record.id}`} passHref legacyBehavior>
                          <Button as="a">Edit</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('parent_child', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/parent-children/view/${record.id}`} passHref legacyBehavior>
                          <Button as="a">View</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('parent_child', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'parent_child',
  operation: AccessOperationEnum.READ,
})(ParentChildListPage);
