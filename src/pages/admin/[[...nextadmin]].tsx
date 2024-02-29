import { type GetServerSideProps, type GetServerSidePropsResult } from "next";
import { NextAdmin, type AdminComponentProps } from "@premieroctet/next-admin";
import schema from "../../../prisma/json-schema/json-schema.json"; // import the json-schema.json file
import "@premieroctet/next-admin/dist/styles.css";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Admin(props: AdminComponentProps) {
  return <NextAdmin {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { nextAdminRouter } = await import(
    "@premieroctet/next-admin/dist/router"
  );
  const adminRouter = await nextAdminRouter(prisma, schema);
  return adminRouter.run(req, res) as Promise<
    GetServerSidePropsResult<Record<string, any>>
  >;
};
