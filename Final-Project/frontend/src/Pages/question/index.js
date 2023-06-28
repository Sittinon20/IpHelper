import React, { useState, useEffect, useRef } from 'react'
import { Container, Box, Card, CardContent, Typography, createTheme, ThemeProvider, Stack, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useFormik } from 'formik'
import Navbar from "../../Components/Navbar"
import * as Yup from 'yup'
import _ from 'lodash'
import { useParams } from "react-router-dom";
import swal from "sweetalert2"
import axios from "axios"
import { getUser} from "../../Services/Authen"

// Component
import { FieldChecker, ProgressBar, useDimensionsResize } from '../../Components/common'

// load json
import questionsJson from '../../Constants/questions.json'

const Question = () => {
  const { id: card_id } = useParams();
  const containerRef = useRef(null)
  const { width } = useDimensionsResize(containerRef)
  const [totalQuestion, setTotalQuestion] = useState(null)
  const [prevQuestions, setPrevQuestions] = useState([])
  const [questions, setQuestions] = useState(null)
  const [form , setForm]= useState ({
    c_type:"สิทธิบัตร",
    status:""
  })  
  const [isSuccess, setisSuccess] = useState(false)

  const theme = createTheme()

  const formik = useFormik({
    initialValues: { answer: '' },
    validationSchema: Yup.object().shape({
      answer: Yup.mixed().required()
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log("เข้า onSubmit");
      if (prevQuestions.length && questions.allcount === questions.count) {
          if (String(questions.text) === String("ผลงานของคุณไม่สามารถจดทะเบียนทรัพย์สินทางปัญญาได้")) {
            setForm({c_type:"ไม่สามารถจดได้", status:"ไม่สามารถจดทะเบียนได้"})
            setisSuccess(true)
            console.log("เข้า if");
          } else if (String(questions.text) === String("ผลงานของคุณเป็นประเภท \"สิทธิบัตรการออกแบบผลิตภัณฑ์\"")) {
            setForm({c_type:"สิทธิบัตรการออกแบบผลิตภัณฑ์", status:"รอตอบคำถามแบบฟอร์ม"})
            setisSuccess(true)
          } else if (String(questions.text) === String("ผลงานของคุณเป็นประเภท \"สิทธิบัตร\"")) {
            setForm({c_type:"สิทธิบัตร", status:"รอตอบคำถามแบบฟอร์ม"})
            setisSuccess(true)
          } else if (String(questions.text) === String("ผลงานของคุณเป็นประเภท \"อนุสิทธิบัตร\"")) {
            setForm({c_type:"อนุสิทธิบัตร", status:"รอตอบคำถามแบบฟอร์ม"})
            setisSuccess(true)
          } else if (String(questions.text) === String("ผลงานของคุณเป็นประเภท \"ลิขสิทธิ์\"")) {
            setForm({c_type:"ลิขสิทธิ์", status:"พร้อมกรอกและส่งเอกสาร"})
            setisSuccess(true)
          } else {
            setForm({c_type:null})
            setisSuccess(true)
          }

        if (isSuccess) {
          console.log("เข้า success");
        axios.put(`${process.env.REACT_APP_API}/cardinfo/${card_id}`, {data:form})
          .then((response) => {
        swal
          .fire("เสร็จสิ้น", "", "success")
          .then((response) => {
            window.location = `/card/${getUser()}`;
          });
      })
      .catch((err) => {
        swal.fire("แจ้งเตือน", `${err.response.data.error}`, "warning");
      });
      }

      } else {
        // Keep Previous Question
        setPrevQuestions((val) =>
          val instanceof Array
            ? [...val, { text: values.answer.text, id: questions.id, nextText: values.answer.nextText }]
            : [{ text: values.answer.text, id: questions.id, nextText: values.answer.nextText }]
        )

        // Find Next Question
        const nextQustion = _.get(totalQuestion, values.answer.nextText)
        setQuestions(nextQustion)
        resetForm()
      }
      setSubmitting(false)
    }
  })

  const handlePrevQuestion = () => {
    const prevQuestionArray = [...prevQuestions] // Clone Previous
    const lastQuestion = prevQuestionArray.pop() // Get last and remove from array
    const qustion = _.get(totalQuestion, lastQuestion.id)
    setQuestions(qustion) // Set Previous Question
    setPrevQuestions(prevQuestionArray) // Set Remain PrevQuestion

    // Set Previous Answer
    formik.setFieldValue('answer', lastQuestion)
  }

  useEffect(() => {
    const alignQuestion = questionsJson.reduce((prev, cur) => {
      prev[cur.id] = {
        ...cur
      }
      return prev
    }, {})
    setTotalQuestion(alignQuestion)

    // set 1st Question
    setQuestions(() => _.get(alignQuestion, 2)) // id = 2
  }, [])

  if (!questions) return <p>Loading</p>

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <div>
        <Container maxWidth='xl'>
          <Box display='flex' justifyContent='center' py={10} px={5}>
            {/* Component Card*/}
            <Card
              component='section'
              sx={{ backgroundColor: 'white', minHeight: 480, width: '100%' }}
              ref={containerRef}
            >
              <CardContent sx={{ padding: 5 }}>
                {/* Question */}
                <Box display='flex' flexDirection='column'>
                  {/* Header */}
                  <Box display='flex' justifyContent='center' mb={5}>
                    <TypogragyHeader variant='h4' component='h4' align='center'>
                      {questions.text}
                    </TypogragyHeader>
                  </Box>
                  {/* Options */}
                  <Box display='flex' justifyContent='center' mb={10}>
                    <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                      {_.map(questions.options, (val, idx) => (
                        <FieldChecker
                          name='answer'
                          label={val.text}
                          value={formik.values.answer.text === val.text}
                          handleOnChange={() => formik.setFieldValue('answer', val)}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Box>
                {/* Button Submit */}
                <Box display='flex' justifyContent='center' gap={3} mb={5} >
                  {prevQuestions.length && questions.allcount !== questions.count ? (
                    <Button variant='contained'onClick={handlePrevQuestion} style={{fontSize: 18}}>
                      ย้อนกลับ
                    </Button>
                  ) : null}

                  <Button variant='contained' onClick={formik.submitForm} disabled={formik.isSubmitting} style={{fontSize: 18}}>
                    {prevQuestions.length && questions.allcount === questions.count ? 'เสร็จสิ้น' : 'ข้อต่อไป'}
                  </Button>
                </Box>
                <ProgressBar progress={questions.count / questions.allcount} maxWidth={width} />
              </CardContent>
            </Card>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  )
}

const TypogragyHeader = styled(Typography)(({ theme }) => ({
  
}))

export default Question
