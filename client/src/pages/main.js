import React, { useState } from "react";
import { Container, Card, InputGroup, FormControl, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Main() {

    const [form, setForm] = useState({
        maxletters: 64,
        letters: 0,
    });
    
    return (
    <>
        <Container>
            <Card className="mt-3">
                <Card.Body className="p-3">
                    <Form.Label className="m-0 classy">Say something!</Form.Label>
                    <FormControl type="text" id="messagebox" placeholder="Write a short message here..." maxLength={form.maxletters} onChange={(e) => setForm({ ...form, letters: e.target.value.length })}/>
                    <Form.Label className="m-0 mt-1">Remaning: {form.letters}/{form.maxletters}</Form.Label>
                </Card.Body>
            </Card>
        </Container>
    </>
    );
}