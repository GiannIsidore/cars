"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Component() {
  const [data, setData] = useState<
    { make: string; model: string; year: string }[]
  >([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const toast = useToast();
  const sendCarsToDatabase = async () => {
    console.log(make, model, year);
    try {
      const response = await axios.post(
        "http://localhost/cars/php/addCars.php",
        {
          make,
          model,
          year,
        }
      );
      if (response.status === 200) {
        toast.toast({
          description: "Car added successfully",
          variant: "success",
        });
        setData([...data, { make, model, year }]);
        setMake("");
        setModel("");
        setYear("");
      } else if (response.status === 400) {
        toast.toast({
          description: "Car already exists",
          variant: "warning",
        });
      }
    } catch (error) {
      toast.toast({
        description: "An error occurred",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost/cars/php/getCars.php");
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="grid md:grid-cols-5">
      <Card className="w-full max-w-md col-span-2">
        <CardHeader>
          <CardTitle>Car Details</CardTitle>
          <CardDescription>Enter your car information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              placeholder="Enter the make of your car"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              placeholder="Enter the model of your car"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="text"
              placeholder="Enter the year of your car"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" onClick={sendCarsToDatabase}>
            Save
          </Button>
        </CardFooter>
      </Card>
      <div className="border rounded-lg overflow-hidden col-span-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* mapp nia */}
            {data.map((cars, index) => (
              <TableRow key={index}>
                <TableCell>{cars.make}</TableCell>
                <TableCell>{cars.model}</TableCell>
                <TableCell>{cars.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
