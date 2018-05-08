import {injectGlobal} from "emotion";
import React from "react";
import global from "../styles/global";
import {Main} from "./main";
import AsyncLoader from "./asyncLoader";
import {Table} from "./table";
import fonts from "../styles/fonts";

interface details{
  [key: string]:string
  id: string
  tier: string
}

class Membership extends AsyncLoader<details>{}

const loader:()=>Promise<details> = async ()=>{
  console.log("hello");
  const resp = await fetch("api/membership", { credentials: "include" });
  const data = await resp.json();
  // tslint:disable-next-line:no-console
  console.log(data);

   return {
      tier: data.tier,
      id: data.subscription.subscriberId
    }
};

const User = (
    <Main>
        {injectGlobal`${global}`}
        {injectGlobal`${fonts}`}
        <Membership fetch={loader} render={(data)=><Table data={data}/>} />
        <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac tellus vel quam commodo convallis sit amet ac ex. Nam vehicula lorem quis neque congue, sed maximus erat pharetra. Sed velit leo, placerat eget euismod eu, venenatis at odio. Nulla enim ante, egestas non nibh vitae, commodo dignissim elit. Aliquam ornare nunc mauris, sodales maximus dui venenatis hendrerit. Aliquam aliquet felis quis fringilla tempus. Fusce neque sapien, dignissim quis sem quis, sagittis bibendum eros. Suspendisse id velit at eros molestie iaculis ac vel eros. Maecenas egestas maximus risus, quis posuere nulla.

Nulla risus eros, porta at enim non, pretium semper purus. Vestibulum lacinia lacus risus, a condimentum mauris ullamcorper a. Morbi porttitor, tellus et pretium varius, elit nulla pretium magna, ut blandit ligula ante eget diam. Pellentesque sollicitudin ante in turpis finibus, vitae molestie risus volutpat. Duis ut augue sed tellus auctor condimentum. Ut arcu magna, laoreet at gravida eu, varius vitae quam. Nam sodales magna at erat rhoncus mollis a non ligula. Praesent est nibh, molestie in interdum ultricies, varius eu mi.

Duis vitae justo leo. Quisque pharetra quam et libero volutpat, a rhoncus quam finibus. Vestibulum velit tellus, congue ut mi eget, imperdiet imperdiet eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce sed mauris consequat, maximus nulla et, vulputate enim. Nunc dictum pharetra orci eu auctor. Etiam a quam elit.

Donec viverra elit ut pharetra consectetur. Sed consectetur ut libero sit amet porttitor. Maecenas finibus tellus eu pellentesque bibendum. Maecenas varius lorem non orci pharetra pulvinar. Integer consectetur, eros id convallis mattis, turpis nunc porttitor lorem, eu volutpat erat turpis in ante. Morbi egestas magna ut tellus vehicula euismod. Donec laoreet porta auctor. Curabitur porta malesuada vulputate. Nulla sit amet massa rutrum, accumsan lorem at, vulputate urna. Praesent nec turpis eget sapien dapibus vulputate dignissim vel tortor.

Phasellus et tristique mi. Phasellus nec quam sit amet eros rutrum semper ut sed augue. Suspendisse convallis, arcu id molestie porta, enim mauris auctor massa, ac dignissim sapien augue vel lectus. Nullam porta justo et dapibus facilisis. Etiam eu nisi elit. Quisque varius feugiat eros, tempus efficitur dui malesuada nec. Fusce ornare sem eget est tempus finibus. Curabitur libero ante, dictum a ex nec, hendrerit bibendum metus. Sed pretium dolor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer sodales leo sed magna faucibus, sit amet consectetur augue vulputate. Donec ac dapibus leo, eu viverra ipsum. In rhoncus ornare arcu vitae rutrum. Aenean iaculis, risus ac lacinia bibendum, ligula odio eleifend augue, eget auctor orci urna vitae orci. Nunc sollicitudin ipsum nisl, nec condimentum mi posuere quis.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac tellus vel quam commodo convallis sit amet ac ex. Nam vehicula lorem quis neque congue, sed maximus erat pharetra. Sed velit leo, placerat eget euismod eu, venenatis at odio. Nulla enim ante, egestas non nibh vitae, commodo dignissim elit. Aliquam ornare nunc mauris, sodales maximus dui venenatis hendrerit. Aliquam aliquet felis quis fringilla tempus. Fusce neque sapien, dignissim quis sem quis, sagittis bibendum eros. Suspendisse id velit at eros molestie iaculis ac vel eros. Maecenas egestas maximus risus, quis posuere nulla.

Nulla risus eros, porta at enim non, pretium semper purus. Vestibulum lacinia lacus risus, a condimentum mauris ullamcorper a. Morbi porttitor, tellus et pretium varius, elit nulla pretium magna, ut blandit ligula ante eget diam. Pellentesque sollicitudin ante in turpis finibus, vitae molestie risus volutpat. Duis ut augue sed tellus auctor condimentum. Ut arcu magna, laoreet at gravida eu, varius vitae quam. Nam sodales magna at erat rhoncus mollis a non ligula. Praesent est nibh, molestie in interdum ultricies, varius eu mi.

Duis vitae justo leo. Quisque pharetra quam et libero volutpat, a rhoncus quam finibus. Vestibulum velit tellus, congue ut mi eget, imperdiet imperdiet eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce sed mauris consequat, maximus nulla et, vulputate enim. Nunc dictum pharetra orci eu auctor. Etiam a quam elit.

Donec viverra elit ut pharetra consectetur. Sed consectetur ut libero sit amet porttitor. Maecenas finibus tellus eu pellentesque bibendum. Maecenas varius lorem non orci pharetra pulvinar. Integer consectetur, eros id convallis mattis, turpis nunc porttitor lorem, eu volutpat erat turpis in ante. Morbi egestas magna ut tellus vehicula euismod. Donec laoreet porta auctor. Curabitur porta malesuada vulputate. Nulla sit amet massa rutrum, accumsan lorem at, vulputate urna. Praesent nec turpis eget sapien dapibus vulputate dignissim vel tortor.

Phasellus et tristique mi. Phasellus nec quam sit amet eros rutrum semper ut sed augue. Suspendisse convallis, arcu id molestie porta, enim mauris auctor massa, ac dignissim sapien augue vel lectus. Nullam porta justo et dapibus facilisis. Etiam eu nisi elit. Quisque varius feugiat eros, tempus efficitur dui malesuada nec. Fusce ornare sem eget est tempus finibus. Curabitur libero ante, dictum a ex nec, hendrerit bibendum metus. Sed pretium dolor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer sodales leo sed magna faucibus, sit amet consectetur augue vulputate. Donec ac dapibus leo, eu viverra ipsum. In rhoncus ornare arcu vitae rutrum. Aenean iaculis, risus ac lacinia bibendum, ligula odio eleifend augue, eget auctor orci urna vitae orci. Nunc sollicitudin ipsum nisl, nec condimentum mi posuere quis.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac tellus vel quam commodo convallis sit amet ac ex. Nam vehicula lorem quis neque congue, sed maximus erat pharetra. Sed velit leo, placerat eget euismod eu, venenatis at odio. Nulla enim ante, egestas non nibh vitae, commodo dignissim elit. Aliquam ornare nunc mauris, sodales maximus dui venenatis hendrerit. Aliquam aliquet felis quis fringilla tempus. Fusce neque sapien, dignissim quis sem quis, sagittis bibendum eros. Suspendisse id velit at eros molestie iaculis ac vel eros. Maecenas egestas maximus risus, quis posuere nulla.

Nulla risus eros, porta at enim non, pretium semper purus. Vestibulum lacinia lacus risus, a condimentum mauris ullamcorper a. Morbi porttitor, tellus et pretium varius, elit nulla pretium magna, ut blandit ligula ante eget diam. Pellentesque sollicitudin ante in turpis finibus, vitae molestie risus volutpat. Duis ut augue sed tellus auctor condimentum. Ut arcu magna, laoreet at gravida eu, varius vitae quam. Nam sodales magna at erat rhoncus mollis a non ligula. Praesent est nibh, molestie in interdum ultricies, varius eu mi.

Duis vitae justo leo. Quisque pharetra quam et libero volutpat, a rhoncus quam finibus. Vestibulum velit tellus, congue ut mi eget, imperdiet imperdiet eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce sed mauris consequat, maximus nulla et, vulputate enim. Nunc dictum pharetra orci eu auctor. Etiam a quam elit.

Donec viverra elit ut pharetra consectetur. Sed consectetur ut libero sit amet porttitor. Maecenas finibus tellus eu pellentesque bibendum. Maecenas varius lorem non orci pharetra pulvinar. Integer consectetur, eros id convallis mattis, turpis nunc porttitor lorem, eu volutpat erat turpis in ante. Morbi egestas magna ut tellus vehicula euismod. Donec laoreet porta auctor. Curabitur porta malesuada vulputate. Nulla sit amet massa rutrum, accumsan lorem at, vulputate urna. Praesent nec turpis eget sapien dapibus vulputate dignissim vel tortor.

Phasellus et tristique mi. Phasellus nec quam sit amet eros rutrum semper ut sed augue. Suspendisse convallis, arcu id molestie porta, enim mauris auctor massa, ac dignissim sapien augue vel lectus. Nullam porta justo et dapibus facilisis. Etiam eu nisi elit. Quisque varius feugiat eros, tempus efficitur dui malesuada nec. Fusce ornare sem eget est tempus finibus. Curabitur libero ante, dictum a ex nec, hendrerit bibendum metus. Sed pretium dolor diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer sodales leo sed magna faucibus, sit amet consectetur augue vulputate. Donec ac dapibus leo, eu viverra ipsum. In rhoncus ornare arcu vitae rutrum. Aenean iaculis, risus ac lacinia bibendum, ligula odio eleifend augue, eget auctor orci urna vitae orci. Nunc sollicitudin ipsum nisl, nec condimentum mi posuere quis.


        </span>
    </Main>
);

export default User;
