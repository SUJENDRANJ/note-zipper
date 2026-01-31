import Heading from "@/components/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

const items = [
  {
    category: "plans",
    title: "What subscription plans do you offer?",
    content:
      "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features.",
  },
  {
    category: "billing",
    title: "How does billing work?",
    content:
      "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers. You'll receive an invoice via email after each payment.",
  },
  {
    category: "cancel",
    title: "How do I cancel my subscription?",
    content:
      "You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. Your access will continue until the end of your current billing period.",
  },
];

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch("/api/data");
      const data = await res.json();
      console.log(data);
      setNotes(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8 max-md:p-1">
      <Heading value={`Welcome Back, ${"Sujendran"}`} />
      <Button variant="ghost" className="bg-blue-500 text-white">
        Create Note
      </Button>
      <Card className="w-full mt-3">
        <CardContent>
          <Accordion type="single" collapsible defaultValue="plans">
            {notes.map((item) => (
              <AccordionItem
                key={item.title}
                value={item.title}
                className="relative"
              >
                <AccordionTrigger className="flex justify-between gap-25 items-center">
                  <p>{item.title}</p>
                  <div className="absolute right-10 flex gap-2">
                    {/* <Button variant="ghost" className="bg-green-500 text-white">
                      Edit
                    </Button>
                    <Button variant="destructive">Delete</Button> */}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Badge variant="outline" className="p-2 bg-gray-300 m-1">
                    {item.category}
                  </Badge>
                  <p>{item.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyNotes;
