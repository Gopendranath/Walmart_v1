// import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { View2Grid } from "./Homegrid";
import { View2MobileGrid } from "./Homegrid";

import ProductList from "./ProductList";

const deals = [
  {
    id: 1,
    title: "50% Off on Electronics",
    description:
      "Get the best deals on top electronics brands. Limited time offer!",
    tag: "Hot Deal",
    price: "$299",
    oldPrice: "$599",
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free",
    description: "Exclusive offer on select fashion products. Hurry up!",
    tag: "BOGO",
    price: "$49",
    oldPrice: "$98",
  },
  {
    id: 3,
    title: "Summer Sale",
    description: "Up to 70% off on home & kitchen essentials.",
    tag: "Limited Time",
    price: "$19",
    oldPrice: "$63",
  },
];

const Deals = () => {

  const isMobile = window.matchMedia("(max-width: 900px)").matches;


  return (
    <div>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Today's Best Deals
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className="flex flex-col justify-between h-full"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {deal.title}
                  <Badge variant="destructive">{deal.tag}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{deal.description}</p>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {deal.price}
                  </span>
                  <span className="line-through text-muted-foreground">
                    {deal.oldPrice}
                  </span>
                </div>
                <Button className="w-full">Shop Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {isMobile ? <View2Grid /> :<View2MobileGrid /> }
      <ProductList />
    </div>
  );
};

export default Deals;
