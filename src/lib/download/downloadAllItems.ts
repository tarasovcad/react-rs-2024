import { ExportCSVProps } from "@/types/types";

const ExportCSV = ({ data, fileName }: ExportCSVProps) => {
  const headers = ["id", "name", "image", "status", "gender", "species"];
  const csvRows = [
    headers.join(","),
    ...data.map((item) =>
      [
        item.id,
        item.name,
        item.image,
        item.status,
        item.gender,
        item.species,
      ].join(","),
    ),
  ];
  const csvString = csvRows.join("\n");
  console.log(fileName);
  // Create a Blob from the CSV string
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "export.csv");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}_character_collections.csv`);
  link.click();
};

export default ExportCSV;
