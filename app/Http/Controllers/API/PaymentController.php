<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Models\Payment;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->authorizeResource(Payment::class, 'payment');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        //todo Probably should send list of landlord's property's payments and list of tenant's payments
        //* Might need multiple routes?
        return ($user->role > 0) ? Payment::paginate(15) : response(null, Response::HTTP_FORBIDDEN); //* Admins only!
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PaymentRequest $request)
    {
        $data = $request->validated();

        $payment = new Payment([
            'amount' => $data['amount'],
            'date_paid' => $data['date_paid'], //* Maybe it processes slower than created_at? Otherwise may just use created_at
            'paid_by' => $data['paid_by'], //* Tenant who paid it - tenant id
            'property_id' => $data['property_id'], //* Property that it belongs to
        ]);
        $payment->save() ? response($payment, Response::HTTP_CREATED) : response(null, Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        return response()->json($payment, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(PaymentRequest $request, Payment $payment)
    {
        $data = $request->validated();

        $paymentDataArr = $payment->toArray();

        $onlyUpdateSome = array_diff($data, $paymentDataArr);

        $finalData = [
            'amount' => $onlyUpdateSome['amount'] ?? $paymentDataArr['amount'],
            'date_paid' => $onlyUpdateSome['date_paid'] ?? $paymentDataArr['date_paid'],
            'paid_by' => $paymentDataArr['paid_by'],
            'property_id' => $paymentDataArr['property_id'],
        ];

        return $payment->update($finalData) ? response($payment, Response::HTTP_NO_CONTENT) : response(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        // $payment->delete(); //* Maybe not possible to delete even for admins
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
