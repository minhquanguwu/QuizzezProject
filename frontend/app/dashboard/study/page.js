import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
export default function StudyPage() {
    return (
        
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[#F2F2F2]">
            <div className="flex flex-wrap space-x-2 flex-row mt-8 overflow-y-auto max-h-screen ">
            <Card className="py-3 mb-10">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
                 <p className="text-tiny uppercase font-bold">Science</p>
                <small className="text-default-500">500 pages</small>
                    <h4 className="font-bold text-large">Data Structure and Algorithm</h4>
                </CardHeader>
            <CardBody className="overflow-visible py-2">
                 <Image
                     alt="Card background"
                     className="object-cover rounded-xl"
                     src="https://product.hstatic.net/200000211451/product/e2e69696-1ed7-41fa-99f5-5eb64599f356_7997c0889d654d2c8e42fb020b0c3402_master.jpg"
                     width={270}
                />
                
            </CardBody>
            </Card>
            
            <Card className="py-3 mb-10">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                 <p className="text-tiny uppercase font-bold">Science</p>
                <small className="text-default-500">722 pages</small>
                    <h4 className="font-bold text-large">Head First Java</h4>
                </CardHeader>
            <CardBody className="overflow-visible py-2 ">
                 <Image
                     alt="Card background"
                     className="object-cover rounded-xl"
                        src="https://img.lazcdn.com/g/p/482745c9a7ddba6a4cd683af67d072d3.jpg_720x720q80.jpg"
                     width={270}
                />
            </CardBody>
            </Card>

            <Card className="py-3 mb-10">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                 <p className="text-tiny uppercase font-bold">Science</p>
                <small className="text-default-500">944 pages</small>
                    <h4 className="font-bold text-large">Operation System Concept</h4>
                </CardHeader>
            <CardBody className="overflow-visible py-2">
                 <Image
                     alt="Card background"
                     className="object-cover rounded-xl"
                        src="https://m.media-amazon.com/images/I/811N4zhBNdL._AC_UF894,1000_QL80_.jpg"
                     width={270}
                />
            </CardBody>
            </Card>

            <Card className="py-3 mb-10">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                 <p className="text-tiny uppercase font-bold">Science</p>
                <small className="text-default-500">190 pages</small>
                    <h4 className="font-bold text-large">Artifical Intelligence</h4>
                </CardHeader>
            <CardBody className="overflow-visible py-2">
                 <Image
                     alt="Card background"
                     className="object-cover rounded-xl"
                        src="https://m.media-amazon.com/images/I/710pXsfK9+L._AC_UF1000,1000_QL80_.jpg"
                     width={270}
                />
            </CardBody>
            </Card>

            <Card className="py-3 mb-10">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                 <p className="text-tiny uppercase font-bold">Economics and Bussiness</p>
                <small className="text-default-500">321 pages</small>
                    <h4 className="font-bold text-large">Đắc nhân tâm</h4>
                </CardHeader>
            <CardBody className="overflow-visible py-2">
                 <Image
                     alt="Card background"
                     className="object-cover rounded-xl"
                        src="https://www.dtv-ebook.com/images/truyen-online/ebook-dac-nhan-tam-prc-pdf-epub.jpg"
                     width={270}
                />
            </CardBody>
            </Card>

            <Card className="py-3 mb-10">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                 <p className="text-tiny uppercase font-bold">Economics and Bussiness</p>
                <small className="text-default-500">354 pages</small>
                    <h4 className="font-bold text-large">The Economics Book</h4>
                </CardHeader>
            <CardBody className="overflow-visible py-2">
                 <Image
                     alt="Card background"
                     className="object-cover rounded-xl"
                        src="https://m.media-amazon.com/images/I/81c6E2VdT3L._AC_UF1000,1000_QL80_.jpg"
                     width={270}
                />
            </CardBody>
            </Card>
            <Card className="py-3 mb-10">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                 <p className="text-tiny uppercase font-bold">Language and Cultural</p>
                <small className="text-default-500">286 pages</small>
                    <h4 className="font-bold text-large">The Study Of Language</h4>
                </CardHeader>
            <CardBody className="overflow-visible py-2">
                 <Image
                     alt="Card background"
                     className="object-cover rounded-xl"
                        src="https://assets.cambridge.org/97805218/35572/large_cover/9780521835572i.jpg"
                     width={270}
                />
            </CardBody>
            </Card>
            <Card className="py-3 mb-10">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                 <p className="text-tiny uppercase font-bold">Physics</p>
                <small className="text-default-500">500 pages</small>
                    <h4 className="font-bold text-large">Fundamentals Of Physics</h4>
                </CardHeader>
            <CardBody className="overflow-visible py-2">
                 <Image
                     alt="Card background"
                     className="object-cover rounded-xl"
                        src="https://scienceshepherd.com/cdn/shop/files/physics-curriculum-homeschool-textbook-cover-min_1200x.jpg?v=1689974136"
                     width={270}
                />
            </CardBody>
            </Card>
            </div>
        </div>
        
    );
}
