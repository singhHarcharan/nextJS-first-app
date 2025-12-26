import client from "@/db/index"

async function getUserDetails() {
  try {
    const userDetail = await client.user.findFirst({});
    console.log("User Details fetched are: ", userDetail)
	  return {
      name: userDetail?.username,
      email: userDetail?.username
    }
  }  catch(e) {
    console.log(e);
  }
}

export default async function Home() {
  const userData = await getUserDetails();
  return (
    <div>
      {userData.email}
    </div>
  );
}
