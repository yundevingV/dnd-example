import Card from "./components/Card";

interface UserListProps {
  name: string;
  description: string;
}

export default function Home() {
  const userList: UserListProps[] = [
    { name: "메시", description: "아르헨티나의 축구선수" },
    { name: "호날두", description: "포루투갈의 축구선수" },
    { name: "드록바", description: "코트디부아르의 축구선수" },
  ];

  return (
    <div className=" items-center justify-items-center min-h-screen ">
      {userList.map((user) => (
        <Card
          key={`user_${user.name}+${user.description}`}
          name={user.name}
          description={user.description}
        />
      ))}
    </div>
  );
}
