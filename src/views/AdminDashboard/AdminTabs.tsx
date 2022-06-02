import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import TagsControl from "./TagsControl";
import InRevisionControl from "./InRevisionControl";

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState<any>("");

  return (
    <>
      <h1>Swap it admin</h1>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        defaultActiveKey="user-settings"
        id="uncontrolled-tab-example"
        className="mb-3 w-100"
      >
        <Tab eventKey="global-tags" title="Global Tags">
          <TagsControl />
        </Tab>
        <Tab eventKey="items-in-revision" title="Items in revision">
          <InRevisionControl />
        </Tab>
      </Tabs>
    </>
  );
}
