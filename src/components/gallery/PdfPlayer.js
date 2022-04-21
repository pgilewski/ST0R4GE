import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useState } from 'react';
// TODO: page next/previous
export default function PdfPlayer(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div className="mx-auto flex flex-col">
      <Document
        className="w-full overscroll-x-auto"
        style={{ width: '100%', margin: 'auto' }}
        file={props.url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className=" p-4 grid text-center grid-cols-3 bg-cyan-900 text-2xl text-gray-200">
        <div
          onClick={() => setPageNumber(pageNumber - 1)}
          className="px-3 cursor-pointer"
        >
          {'<'}
        </div>
        {pageNumber}
        <div
          onClick={() => setPageNumber(pageNumber + 1)}
          className="px-3 cursor-pointer"
        >
          {'>'}
        </div>
      </div>

      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
